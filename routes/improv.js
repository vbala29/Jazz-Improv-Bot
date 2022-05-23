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

/**
 * 
 * @param {*} sections e.g. ['A', 'A', 'B', 'A']
 * @param {*} section_chord_map chord/duration pair arrays for each section
 * @param {*} info on the chart-the name of the chart
 * @returns 1 if no error in chord creation, -1 if there is an error
 */
function generateChartObject(sections, section_chord_map, info) {
   //var chart = chart.create(['A'], {A : [{chord: 'C7', duration: 4}]}, {foo: 1});
   console.log(sections)
   console.log(JSON.stringify(section_chord_map).toString());
   console.log(JSON.stringify(info).toString());
   try {
      var chart = s11.chart.create(sections, section_chord_map, info); 
   } catch(err) {
      console.log("Error caught in chart creation: " + err.content)
      return -1;
   } 

   return 1;
   
}

//TO DO ADD BACK IN LOGGED IN!!!

router.post('/improv/generateChart', (req, res) => {
   var body = req.body; //Already JSON parsed by express json middleware
   console.log("Received post request body, type is " + typeof(body))
   var ret = generateChartObject(body.sections, body.content, body.info);

   //Determine appropriate HTTP response
   if (ret === 1) {
      res.sendStatus(201); //CREATION response code
   } else {
      res.sendStatus(406); //NOT ACCCEPTABLE response code
   }
})

router.get('/improv', (req, res) => {
   res.render('improv/improv.ejs', {error: req.flash("error"), success: req.flash("success")})
})


//  router.get('/improv', isLoggedIn, (req, res) => {
//     res.render('improv/improv.ejs', {error: req.flash("error"), success: req.flash("success")})
//  })


module.exports = router;