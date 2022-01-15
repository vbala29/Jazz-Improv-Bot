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

router.get('/register', (req, res) => {
    res.render('users/register', {error: req.flash("error"), success: req.flash("success")});
    res.end()
})

router.post('/register', asyncHandler(async (req, res) => {
    try {
        const {email, username, password, passwordVerify} = req.body;
        const user = new User({email : email, username : username, password : password});
        const registeredUser = await User.register(user, password);
        req.flash('success', "Please log in with your new account")
        res.redirect('\login')
    } catch (ex) {
        req.flash('error', ex.message)
        res.redirect('register')
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login', {error: req.flash("error"), success: req.flash("success")})
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
    req.flash('success', `Welcome back`)
    res.redirect("/improv")
})


module.exports = router;