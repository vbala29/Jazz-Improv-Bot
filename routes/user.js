/**
 * Developer: Vikram Bala
 * Contact: vikrambala2002@gmail.com
 * Github Repository: https://github.com/vbala29/Jazz-Improv-Bot#readme
 */

const express = require('express')
const router = express.Router();
const User = require('../models/user');
const asyncHandler = require('../scripts/asyncHandler.js')

router.get('/register', (req, res) => {
    res.render('users/register', {error: req.flash("error"), success: req.flash("success")});
    res.end()
})

router.post('/register', asyncHandler(async (req, res) => {
    try {
        const {email, username, password, passwordVerify} = req.body;
        const user = new User({email : email, username : username, password : password});
        const registeredUser = await User.register(user, password);
        req.flash('success', "Welcome to Jazz Improv Bot")
        res.redirect('\home')
    } catch (ex) {
        req.flash('error', ex.message)
        res.redirect('register')
    }
}))

module.exports = router;