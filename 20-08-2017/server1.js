const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',

    database: 'sivadb',

})

con.connect(function(error) {
            if (error) {
                console.log(error)
                return
            }
            console.log('connected')
            app.get('/', function(req, res) {
                res.sendFile('/home/prakashr/node-js-practice/29-08-2017/login-using-mongodb/public/create.html')
            })

            app.post('/create', function(req, res) {
                    let mailid = req.body.mailid;
                    let password = req.body.password;

                    con.query(`INSERT INTO user (mailid,password) VALUES ("${mailid}", "${password}")`,
                        function(error, result) {
                            if (error) {
                                console.error(error)
                                return
                            }


                        });
                        console.log(' done')
                    })
            })


app.listen(3000,function() {
	console.log('port 3000')
})