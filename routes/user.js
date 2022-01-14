/**
 * Developer: Vikram Bala
 * Contact: vikrambala2002@gmail.com
 * Github Repository: https://github.com/vbala29/Jazz-Improv-Bot#readme
 */

const express = require('express')
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
    res.end()
})

router.post('/register', async (req, res) => {
    const {email, username, password, passwordVerify} = req.body;
    console.log(req.body)
    const user = new User({email : email, username : username, password : password});
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.flash("Welcome to Jazz Improv Bot")
    res.redirect('\home')
})

module.exports = router;