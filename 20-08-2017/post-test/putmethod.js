const express = require('express');
const app = express();
const con = require('./db');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
var bcrypt = require('bcrypt');
const saltRounds = 10;

const path = require('path');





app.get('/', function(req, res) {
    res.sendfile(path.resolve('./index.html'));
});



app.post('/create', function(req, res) {
    const mail = req.body.mail;
    const plainPassword = req.body.pwd;
    bcrypt.hash(plainPassword, saltRounds, function(err, password) {
        if (err) {
            console.error(err);
        }


        const insert = `INSERT INTO mailid (usermail, password) VALUES ("${mail}", "${password}")`;
        con.query(insert, function(err, result) {
            if (err) {
                console.log(err);
                return;
            };
            res.send('record insert');
            console.log('1 record insert')
        })

    });

})

app.post('/login', function(req, res) {
            console.log(req.body)

            let mail = req.body.mail;
            let password = req.body.pwd;


            const query = `SELECT * FROM mailid WHERE usermailid = "${mail}"`;

            con.query(query, function(err, result) {
                if (err) throw err;
                let msg;
                if (result.length === 0) {
                    msg = 'wrong mailid';
                } else if (result.length > 0) {
                    const user = result[0];
                    console.log(user);
                    bcrypt.compare(password, user.password, function(err, isCorrect) {
                        if (err) {
                            console.error(err)
                        }

                        if (!isCorrect) {
                            msg = 'wrong password';
                        } else {
                            msg = `USER ID : ${user.id}`
                        }

                        res.send(msg);


                    });

                }

            })



            app.put('/update', function(req, res) {
                let mail = req.body.mail;
                const plainPassword = req.body.pwd;
                bcrypt.hash(plainPassword, saltRounds, function(err, password) {
                    if (err) {
                        console.error(err);
                    }
                    console.log(password);
                    const update = `UPDATE mailid SET password= "${password}" WHERE usermailid= "${mail}"`;
                    console.log(update)
                    con.query(update, function(err, result) {
                        if (err) {
                            console.log(err);
                        }
                        res.send('record is update');
                    })


                })
            });

            app.listen(3000, function() {
                console.log('port 3000 connected')
            });