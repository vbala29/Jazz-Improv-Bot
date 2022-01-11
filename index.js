/**
 * Developer: Vikram Bala
 * Contact: vikrambala2002@gmail.com
 * Github Repository: https://github.com/vbala29/Jazz-Improv-Bot#readme
 */

const express = require('express')
const process = require('process')
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = express()
const session = require('express-session') //Adds to req param
//const flash = require('connect-flash') //Adds to req param
const AppError = require('./AppError')

/* ENV variables */
const port = process.env.PORT || 8000;
const httpsUse = process.env.HTTPS === 'true';
const secretKey = process.env.SECRET_KEY;

app.use(session({secret: secretKey, resave: false, saveUninitialized: false}))
//app.use(flash())


/* Routes */

const userRoutes = require('./routes/user')

/* MongoDB */

mongoose.connect('mongodb://localhost:27017/jazz-improv', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("error", console.error.bind("Jazz-Improv database connection error:"))
db.once("open", () => {
    console.log("Jazz-Improv database connected")
})


/* Express App Setup */

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

/* Passport */

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


/* Error Routes */

app.get('/', (req, res) => {
   res.send('Now using https..');
});

app.use('/', userRoutes)

app.all('*', (req, res, next) => {
    next(new AppError('Resource Not Found', 404))
})

//Custom Error Handling Middleware
app.use((err, req, res) => {
    res.status(err.status).render('error')
})

/* HTTPS Setup */ 

var key = fs.readFileSync(path.join(__dirname, '/certs/selfsigned.key'));
var cert = fs.readFileSync(path.join(__dirname, '/certs/selfsigned.crt'));
var options = {
  key: key,
  cert: cert
};


app.listen(port, function () {
    var server = httpsUse ? https.createServer(app) : http.createServer(options, app);
    console.log("Server starting. Port: " + port + " Protocol: " + `${httpsUse ? 'HTTPS' : 'HTTP'}`);
    return server.listen.apply(server, arguments)
})


