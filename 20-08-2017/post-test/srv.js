const express = require('express');
const app = express();
app.param('/', function(req, res, next, id) {

  // try to get the user details from the User model and attach it to the request object
  User.find(id, function(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('failed to load user'));
    }
  });
});


app.listen(3000, function () {
   console.log('port 3000 conectted')
})