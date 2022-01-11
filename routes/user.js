/**
 * Developer: Vikram Bala
 * Contact: vikrambala2002@gmail.com
 * Github Repository: https://github.com/vbala29/Jazz-Improv-Bot#readme
 */

const express = require('express')
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register')
})

module.exports = router;