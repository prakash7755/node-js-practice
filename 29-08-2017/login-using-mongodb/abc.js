'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./connection')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.use(express.static('public'));
var bcrypt = require('bcrypt');
const saltRounds = 10;


function getFields(input, field) {
    var output = input.map(x => x[field]);
    return output;
}

// Create New Account //
app.post('/create', function(req, res) {
    let mailid = req.body.mailid;
    let inpassword = req.body.password;
    bcrypt.hash(inpassword, saltRounds, function(err, password) {
        if (err) {
            return console.error(err);
        }



        // Chacking Mail ID Process //

        User.find({ mailid }, function(error, results) {
            if (results.length > 0) {
                let msg = 'this mailid alredy exit'
                return res.send(msg)
            }
            // Add New User //
            const user = new User({
                mailid,
                password
            });

            user.save(function(error) {
                if (error) {
                    return console.error(error)
                }
                res.send('create suceess')

            })

        })
    })
});

// Login Process //

app.post('/login', function(req, res) {
    let mailid = req.body.mailid;
    let inpassword = req.body.password;

    //Mail ID Chacking Process //

    User.find({ mailid }, function(error, results) {
        // Using GetField Method Find Mail Id And Password
        let mailid1 = getFields(results, "mailid");
        let mail = mailid1.toString()
        console.log(mail)
        // Chack In Mail Id //
        if (mail !== mailid) {
            let msg = 'wrong mail id'
            return res.send(msg)
        }
        console.log(results)
        // Check In password //

            let password1 = getFields(results, "password");
            let pwd = password1.toString()
            console.log(inpassword);
            console.log(pwd)


         bcrypt.compare(inpassword, pwd, function(err, isCorrect) {
                        if (err) {
                            console.error(err)
                        }

                        if (!isCorrect) {
                          let  msg = 'wrong password';
                          res.send(msg)
                        } 
        
            res.send('suceess')
        });

    })
})




app.post('/changepassword', function(req, res) {
    let mailid = req.body.mailid;
    let inpassword = req.body.password;
    bcrypt.hash(inpassword, saltRounds, function(err, password) {
        if (err) {
            return console.error(err);
        }

        // Chacking Mail ID Process //

        User.findOneAndUpdate({ mailid }, { password }, { new: true }, function(error, result) {
            if (error) {
                return console.error(error)
            }

            res.json(result)
        })

    })
})

app.listen(3000, function() {
    console.log('connected port 3000')
})