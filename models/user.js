/**
 * Developer: Vikram Bala
 * Contact: vikrambala2002@gmail.com
 * Github Repository: https://github.com/vbala29/Jazz-Improv-Bot#readme
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    charts: [{chart: {type: String, required: true}, title: {type: String, required: true}}]
})

//Adds password and username field automatically.
UserSchema.plugin(passportLocalMongoose)

//Sets up User collection. 
module.exports = mongoose.model('User', UserSchema);

