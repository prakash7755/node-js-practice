'use strict';
const express = require('express');
const app = express();
const body = require('body-parser');
app.use(body.urlencoded({ extended: true }))
app.use(body.json());
const con = require('./db');



var pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'muralidb'
});



app.get('/', function(req, res) {
    res.sendFile('/home/prakash/post-test/index.html')
})

app.post('/login', function(req, res) {
    var mail = req.body.mail;
    var pass = req.body.psw;
    var query = 'SELECT * FROM mailid WHERE usermailid = "' + mail + '"';
    pool.query(query, function(error, results, fields) {
        if (error) {
        	console.log(error)
        }

        var message;

        if (results.length === 0) {
        	message = 'Wrong Email ID'
        } else if (results.length > 0) {
        	var user = results[0];
        	if (user.password !== pass) {
        		message = 'Wrong Password';
        	} else {
           message = 'Success...';
        }
        } 



        res.send(message);
    });


})

app.listen(3000, function() {
    console.log('port 3000 conectted')
})