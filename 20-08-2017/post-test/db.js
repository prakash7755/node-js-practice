const mysql = require('mysql');
const con = mysql.createPool({
	host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'muralidb'
})




module.exports = con;