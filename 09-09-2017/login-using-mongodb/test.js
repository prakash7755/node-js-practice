'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./connection')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.use(express.static('public'));

const Pass = require('./passwordenc');

const encPass = Pass.ecryptPassword;
const decPass = Pass.decrptPassword


function getFields(input, field) {
    var output = input.map(x => x[field]);
    return output;
}

// Create New Account //
app.post('/register', function(req, res) {
    let mailid = req.body.mailid;
    let inpassword = req.body.password;
    let rePassword = req.body.rePassword;
    // Chacking Mail ID Process //

    User.find({ mailid }, function(error, results) {
        if (results.length > 0) {
            let msg = 'this mailid alredy exit'
            return res.send(msg)
        }
        if (inpassword !== rePassword) {
            let msg = 'Your Password And rePassword are Mismatch'
            return res.send(msg);
        }
        // Add New User //
        encPass(inpassword, function(error, password) {
            const user = new User({
                mailid,
                password
            });

            user.save(function(error, result) {
                if (error) {
                    return console.error(error);
                }

                res.json(result)
            })
        })


    })

})
// Login Process //

app.post('/login', function(req, res) {
    let mailid = req.body.mailid;
    let inpassword = req.body.password;

    //Mail ID Chacking Process //

    User.find({ mailid }, function(error, results) {
        // Using GetField Method Find Mail Id And Password
        let mailid1 = getFields(results, "mailid");
        let mail = mailid1.toString()
        // Chack In Mail Id //
        if (mail !== mailid) {
            let msg = 'wrong mail id'
            return res.send(msg)
        }
        console.log(results)
        // Check In password //


        let password1 = getFields(results, "password");
        let pwd = password1.toString()

        decPass(inpassword, pwd, function(error, isCorrect) {

            if (!isCorrect) {
                let msg = 'wrong password';
                return res.send(msg)
            }
        });

    });

});

Change Password//

// function errorHandler(error) {
//     res.json({
//         isSuccess: false,
//         message: error.message
//     })
// }

// app.put('/change-password', function(req, res) {


//     let mailid = req.body.mailid;
//     let inpassword = req.body.password;
//     encPass(inpassword, function(error, password) {
//         if (error) {
//             errorHandler(error);
//             return console.error(error);
//         }

//         // Chacking Mail ID Process //

//         User.findOneAndUpdate({ mailid }, { password }, { new: true }, function(error, result) {
//             if (error) {
//                 errorHandler(error);
//                 return console.error(error)
//             }

//             // if (!result) {
//             //     const error = new Error('Sorry This Email Not Exist');
//             //     return errorHandler(error);
//             // }

//             res.json({
//                 isSuccess: true,
//                 result
//             })
//         })


//     })
// })



app.listen(3000, function() {
    console.log('connected')
})