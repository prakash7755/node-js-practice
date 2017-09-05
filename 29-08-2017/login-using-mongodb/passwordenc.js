'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;







function ecryptPassword(plainPassword, cb) {
    if (!plainPassword) {
        const error = new Error('Plain Password Should Not Be Empty')
        return cb(error);
    };

    bcrypt.hash(plainPassword, saltRounds, function(error, password) {
        if (error) {
            return cb(error, null);
        }
        return cb(null, password);

    })

}





function decrptPassword(plainPassword, outPassword ,cb) {
    if (!plainPassword) {
        const error = new Error(' Plain plainPassword')
        return cb(error)
    }
 if (! outPassword) { 
         const error = new Error('plain output password')
         return cb(error) 
 }
    bcrypt.compare(plainPassword, outPassword, function(error, isCorrect) {
        if (error) {
            return cb(error, null)
        }
       cb(null, isCorrect)
    });
}


module.exports =  {ecryptPassword , decrptPassword} 