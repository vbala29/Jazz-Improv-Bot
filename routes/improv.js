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

function generateChartObject(sections, section_chord_map, info) {
   //     var chart = chart.create(['A'], {A : [{chord: 'C7', duration: 4}]}, {foo: 1});
   var chart = chart.create(sections, section_chord_map, info); 
}


router.get('/improv', (req, res) => {
   res.render('improv/improv.ejs', {error: req.flash("error"), success: req.flash("success")})
})


router.get('/generateChart', isLoggedIn, (req, res) => {
   
})

//  router.get('/improv', isLoggedIn, (req, res) => {
//     res.render('improv/improv.ejs', {error: req.flash("error"), success: req.flash("success")})
//  })


module.exports = router;