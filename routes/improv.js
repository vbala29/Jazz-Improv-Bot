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
const { Chart } = require('sharp11/lib/chart');
const AWS = require ('aws-sdk');
const process = require('process')

const DEBUG = 0;

/**
 * 
 * @param {*} sections e.g. ['A', 'A', 'B', 'A']
 * @param {*} section_chord_map chord/duration pair arrays for each section
 * @param {*} info on the chart-the name of the chart
 * @returns 1 if no error in chord creation, -1 if there is an error
 */
async function generateChartObject(sections, section_chord_map, info, username) {
   try {
      var chart = s11.chart.create(sections, section_chord_map, info); 
      var json_chart = JSON.stringify(chart.serialize());
      await User.findOne({'username': username}).exec(async (err, doc) => {
         if (err) { 
            console.log("Error in Query /improv/generateChart: " + err);
         } else {
            if (DEBUG) console.error("Result of Query: " + doc);
            await doc.charts.push({chart: json_chart, title: info.title});
            await doc.save();
         } 
      });
     
   } catch(err) {
      console.log("Error caught in Chart Creation: " + err.message)
      return -1;
   } 

   return 1;
}

router.put('/improv/improviseOnChart', isLoggedIn, (req, res) => {
   if (1) console.log("Improv Requested For Chart: " + req.body);

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
               if (chart.info.title === req.body) {
                  if (DEBUG) console.log("Chart requested has been found!")
                  chartRequested = chart;
                  break;
               }
            }

            if (chartRequested === null) {
               console.err("Unable to find chart with name \"" + req.body + "\" for user " + req.user.username);
               res.sendStatus(400).end(); //BAD REQUEST 400 HTTP STATUS
            } else {
               console.log("Calling AWS Lambda function for " + chartRequested.info.title);
               lambda(JSON.stringify(chartRequested.serialize()));
            }
         }
      })
   })();
})

const lambda = (chart) => {
   AWS.config.update({
      accessKeyId: process.env.accessKeyId, 
      secretAccessKey: process.env.secretAccessKey,
      region: 'us-east-1'
   });

   const params = {
      FunctionName: 'jazz-improv-bot',
      Payload: JSON.stringify({
         'chart': chart
      })
   };

   const result = new AWS.Lambda().invoke(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data)
   })

   console.log('Success running Lambda Function!')
   console.log('Result of Lambda Function: ' + result);
}

router.get('/improv/selectChart', isLoggedIn, (req, res) => {
   (async () => {
      await User.findOne({'username': req.user.username}).exec(async (err, doc) => {
         if (err) { 
            console.error("Error in Query /improv/retrieveCharts: " + err);
         } else {
            if (DEBUG) console.log("Result of Query: " + doc);

            var view_params = {};
            var i = 0;
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
   var body = req.body; //Already JSON parsed by express json middleware
   generateChartObject(body.sections, body.content, body.info, req.user.username).then(
      ret => {
         //Determine appropriate HTTP response
         if (ret === 1) {
            res.sendStatus(201); //CREATION response code
         } else {
            res.sendStatus(406); //NOT ACCCEPTABLE response code
         }
      }
   ).catch(
      error => console.log("Error in generateChartObject(): " +  error.message)
   );

})

router.get('/improv', isLoggedIn, (req, res) => {
   res.render('improv/improv.ejs', {error: req.flash("error"), success: req.flash("success")})
})


module.exports = router;