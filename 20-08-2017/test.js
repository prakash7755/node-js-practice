const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const con = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'root',



	database : 'test',

})

con.connect(function(err,result) {
	if (err) throw error
		console.log('connected')

con.query('CREATE TABLE customer (name VARCHAR(255), password VARCHAR(255))', function (err,result) {
	if (err) throw err
		console.log('test')
})
})