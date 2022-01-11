const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

mongoose.connect('mongodb://localhost:27017/jazz-improv', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection
db.on("error", console.error.bind("Jazz-Improv database connection error:"))
db.once("open", () => {
    console.log("Jazz-Improv database connected")
})

const app = express()

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

