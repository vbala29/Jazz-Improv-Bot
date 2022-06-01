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
const { request } = require('express');
const asyncHandler = require(locals.scripts + '/asyncHandler.js')
const isLoggedIn = require(locals.scripts + '/isLoggedIn')
const generateChartObject = require('../routes/improv').generateChartObject

const AllTheThingsYouAre = {
    A: [ { chord: 'Fm7', duration: 4 }, { chord: 'Bbm7', duration: 4 }, { chord: 'Eb7', duration: 4 }, { chord: 'AbM7', duration: 4 },
        { chord: 'DbM7', duration: 4 }, { chord: 'Dm7', duration: 2 }, { chord: 'G7', duration: 2 }, { chord: 'CM7', duration: 8 },
        { chord: 'Cm7', duration: 4 }, { chord: 'Fm7', duration: 4 }, { chord: 'Bb7', duration: 4 }, { chord: 'EbM7', duration: 4 },
        { chord: 'AbM7', duration: 4 }, { chord: 'Am7', duration: 2 }, { chord: 'D7', duration: 2 }, { chord: 'GM7', duration: 8 },
        { chord: 'Am7', duration: 4 }, { chord: 'D7', duration: 4 }, { chord: 'GM7', duration: 8 },
        { chord: 'F#m7b5', duration: 4 }, { chord: 'Bb7b9', duration: 4}, { chord: 'EM7', duration: 4 }, { chord: 'C7b13', duration: 4 },
        { chord: 'Fm7', duration: 4 }, { chord: 'Bbm7', duration: 4 }, { chord: 'Eb7', duration: 4 }, { chord: 'AbM7', duration: 4 },
        { chord: 'DbM7', duration: 4 }, { chord: 'DbmM7', duration: 4 }, { chord: 'Cm7', duration: 4 }, { chord: 'Bdim7', duration: 4 },
        { chord: 'Bbm7', duration: 4 }, { chord: 'Eb7', duration: 4 }, { chord: 'AbM7', duration: 4 }, { chord: 'Gm7b5', duration: 2 }, { chord: 'C7b9', duration: 2 } ]
  }


router.delete('/deleteAccount', isLoggedIn, async (req, res) => {
    await User.deleteOne({'username': req.user.username})

    var exists = await User.exists({'username': req.user.username})

    if (!exists) {
        req.logout(); //Removes req.user property and clears session
        req.flash('loggedOut', "You have succesfully deleted your account")
        res.redirect('/login');
    } else {
        req.flash('error', "Unable to delete account, please try later")
    }
})

router.get('/account', isLoggedIn, (req, res) => {
    res.render('users/account', {username: req.user.username});
    res.end();
})

router.get('/register', (req, res) => {
    res.render('users/register', {error: req.flash("error"), success: req.flash("success")});
    res.end()
})

router.post('/register', asyncHandler(async (req, res) => {
    try {
        const {email, username, password, passwordVerify} = req.body;
        const user = new User({email : email, username : username, password : password});
        const registeredUser = await User.register(user, password);

        //Add the default chart to the user's account
        generateChartObject(['A'], AllTheThingsYouAre, {title: "All The Things You Are - Jerome Kern"}, username)

        req.flash('success', "Please log in with your new account")
        res.redirect('\login')
    } catch (ex) {
        req.flash('error', ex.message)
        res.redirect('register')
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login', {error: req.flash("error"), success: req.flash("success"), loggedOut: req.flash("loggedOut")})
})

//FailureFlash and failureRedirect are options inbuilt into Passport. Both callbacks get called unless failureRedirect is called. 
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
    req.flash('success', `Welcome back`)
    res.redirect("/")
})

router.get('/logout', (req, res) => {
    req.logout(); //Removes req.user property and clears session
    req.flash('loggedOut', "You have succesfully been logged out")
    res.redirect('/login');
})


module.exports = router;