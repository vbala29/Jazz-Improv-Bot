/**
 * Developer: Vikram Bala
 * Contact: vikrambala2002@gmail.com
 * Github Repository: https://github.com/vbala29/Jazz-Improv-Bot#readme
 */

const express = require('express')
const router = express.Router();
const locals = require('../app.locals.js')
const User = require(locals.models + '/user');
const passport = require('passport');
const asyncHandler = require(locals.scripts + '/asyncHandler.js')
const isLoggedIn = require(locals.scripts + '/isLoggedIn')
const s11 = require('sharp11')
const mongoose = require('mongoose');
const AWS = require ('aws-sdk');
const process = require('process')
const improv = require('sharp11-improv')

const DEBUG = 0;

/**
 * 
 * @param {*} sections e.g. ['A', 'A', 'B', 'A']
 * @param {*} section_chord_map chord/duration pair arrays for each section
 * @param {*} info on the chart-the name of the chart
 * @returns 1 if no error in chord creation, -1 if there is an error
 */
async function generateChartObject(sections, section_chord_map, info, username) {
   let user = await User.findOne({'username': username});

   //Checks if chart with duplicate name already existed. 
   for (c of user.charts) {
      let serialized_chart = c;
      let chart = s11.chart.load(JSON.parse(serialized_chart.chart));
      if (chart.info.title === info.title) {
         return -2; 
      }
   }

   try {
      let chart = s11.chart.create(sections, section_chord_map, info); 
      let json_chart = JSON.stringify(chart.serialize());
      await User.findOne({'username': username}).exec(async (err, doc) => {
         if (err) { 
            console.error("Error in Query /improv/generateChart: " + err);
         } else {

            await doc.charts.push({chart: json_chart, title: info.title});
            await doc.save();
         } 
      });
     
   } catch(err) {
      console.error("Error caught in Chart Creation: " + err.message)
      return -1;
   } 

   return 1;
}

router.post('/improv/improviseOnChart', isLoggedIn, (req, res) => {
   if (DEBUG) console.log("Improv Requested For Chart: " + req.body.title);

   (async () => {
      await User.findOne({'username': req.user.username}).exec(async (err, doc) => {
         if (err) {
            console.error("Error in Query /improv/improviseOnChart: " + err);
         } else {
            if (DEBUG) console.log("Result of Query: " + doc);

            let chartRequested = null;
            for (c of doc.charts) {
               let serialized_chart = c;
               let chart = s11.chart.load(JSON.parse(serialized_chart.chart));
               if (chart.info.title === req.body.title) {
                  if (DEBUG) console.log("Chart requested has been found!")
                  chartRequested = chart;
                  break;
               }
            }

            if (chartRequested === null) {
               console.error("Unable to find chart with name \"" + req.body.title + "\" for user " + req.user.username);
               res.sendStatus(400).end(); //BAD REQUEST 400 HTTP STATUS
            } else {
               console.log("Calling AWS Lambda function for " + chartRequested.info.title);

               lambda(JSON.stringify(chartRequested.serialize()), req.body.rests,
                  req.body.outness, req.body.substitutions, req.body.chords, req.body.tempo).then(
                     (data) => {
                     console.log("AWS Lambda Successful Invocation");

                     //Send improv data back to the front end FETCH API request so it can play the improv
                     if (data != null) {
                        let payload = JSON.parse(data.Payload);
                        let notes_and_durations = JSON.parse(payload.improv);

                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(
                                 {
                                    improv: notes_and_durations,
                                    chart: chartRequested.content['A'],
                                    chords: payload.chords,
                                    tempo: req.body.tempo
                                 }
                        ));
                     } else {
                        res.sendStatus(500); //Internal server error HTTP status code
                     }
                  }).catch(err => {
                     console.error(err)
                     res.sendStatus(500); //Internal server error HTTP status code
                  });
            }
         }
      })
   })();
})

const lambda = async (chart, rests, outness, substitutions, chords_boolean, tempo) => {
   AWS.config.update({
      accessKeyId: process.env.accessKeyId, 
      secretAccessKey: process.env.secretAccessKey,
      region: 'us-east-1'
   });

   const params = {
      FunctionName: 'jazz-improv-bot',
      Payload: JSON.stringify({
         'chart': chart,
         'rests': rests,
         'outness': outness,
         'substitutions': substitutions,
         'chords': chords_boolean,
         'tempo': tempo
      })

   };

   const lambda = new AWS.Lambda();
   return await lambda.invoke(params).promise();
}

router.get('/improv/selectChart', isLoggedIn, (req, res) => {
   (async () => {
      await User.findOne({'username': req.user.username}).exec(async (err, doc) => {
         if (err) { 
            console.error("Error in Query /improv/retrieveCharts: " + err);
         } else {
            if (DEBUG) console.log("Result of Query: " + doc);

            let view_params = {};
            let i = 0;
            for (c of doc.charts) {
               let serialized_chart = c;
               let chart = s11.chart.load(JSON.parse(serialized_chart.chart));
               view_params[i] = chart.info.title; 
               if (DEBUG) console.log("Title #" + i + ": " + chart.info.title);
               i++;
            }

            res.render('improv/selectChart.ejs', {view_params: view_params, length: Object.keys(view_params).length});
         } 
      });
   })();
   
})

router.post('/improv/generateChart', isLoggedIn, (req, res) => {
   let body = req.body; //Already JSON parsed by express json middleware

   generateChartObject(body.sections, body.content, body.info, req.user.username).then(
      ret => {
         //Determine appropriate HTTP response
         if (ret === 1) {
            res.sendStatus(201); //CREATION response code
         } else if (ret === -2) {
            res.sendStatus(400); //BAD Request
         } else { //ret === -1
            res.sendStatus(406); //NOT ACCEPTABLE response code
         }
      }
   ).catch(
      error => console.error("Error in generateChartObject(): " +  error.message)
   );

})

router.get('/improv', isLoggedIn, (req, res) => {
   res.render('improv/improv.ejs', {error: req.flash("error"), success: req.flash("success")})
})

router.delete('/improv/deleteChart', isLoggedIn, (req, res) => {
   let body = req.body; //Plain text
   User.findOne({'username': req.user.username}).exec((err, doc) => {
      if (err) {
         console.error("Unable to find user to deleteChart. Username: " + req.user.username);
      } else {

         let index = 0;
         for (c of doc.charts) {
            let serialized_chart = c;
            let chart = s11.chart.load(JSON.parse(serialized_chart.chart));

            if (chart.info.title === body) {
               doc.charts.splice(index, 1); //Remove this chart
               doc.save((err) => {
                  if (err) {
                     console.error("Error in deleting chart");
                     res.sendStatus(500); //HTTP 500 Internal Servor Error
                  } else {
                     res.sendStatus(204); //HTTP 204 Resource Deleted Successfully
                  }

                  res.end();
               })
               
               return;
            }
            index++
         }
      }
   })
})


module.exports = {
   routes: router,
   generateChartObject: generateChartObject
}
