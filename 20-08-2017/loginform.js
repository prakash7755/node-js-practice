const express = require('express');
const app = express();
const mySql = require('mysql');
const bodyParser = require('body-parser');
const con = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',



    database: 'logindb'
});



function errorHandler(error) {
    if (error) {
        throw error;
    }
}

path = require('path')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.sendFile('/home/prakash/20-08-2017/loginform.html');
    console.log('test')
});

con.connect(function(err, result) {
            errorHandler(err);
            console.log('connected')
            app.post('/create', function(req, res) {
                    let mailid = req.body.mailid;
                    let password = req.body.password;
                    con.query(`SELECT * FROM mailid WHERE usermail = '${mailid}'`, function(err, result) {
                           errorHandler(err)

                            if (result.length > 0) {
                                var msg = 'this mail all ready exit';
                                return res.send(msg);
                            }


                            con.query(`INSERT INTO mailid (usermail, password) VALUES ("${mailid}","${password}")`, function(err, result) {
                                errorHandler(err)
                                

                                res.send('success')
                            })
                        });
                        app.post('/login', function(req, res) {
                            let mailid = req.body.mailid;
                            let password = req.body.password;

                            con.query(`SELECT * FROM mailid WHERE usermail = '${mailid}'`, function(err, result) {
                              errorHandler(err)
                                var msg;
                                if (mailid.length === 0) {
                                    msg = 'wrong mailid'

                                } else if (result.length > 0) {
                                    const user = result[0];
                                    console.log(user)
                                    if (password != user.password) {
                                        msg = 'wrong password';
                                    } else {
                                        msg = `USER mailid : ${user.usermail}`
                                    }

                                    res.send(msg);
                                }

                            })

                        });
                    });
            });

        app.listen(3000, function() {

            console.log('port 3000 connected')
        })