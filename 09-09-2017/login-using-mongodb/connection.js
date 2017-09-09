'use strict'
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/logindb');
var Schema= mongoose.Schema({
    mailid: String,
    password: String,
});


let user = mongoose.model('Kitten', Schema);
module.exports = user;



// const Schema = mongoose.Schema;
//     user = Schema.user;
//     user = new Schema {



//     	mailid : String,
//     	password : String, 
//     }
   








