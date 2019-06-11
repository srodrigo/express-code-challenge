const sha1 = require('sha1');

const User = require('../models/user');

function authenticateUser(email, password, done) {
  User.findOne(
    { email: email, password: sha1(password) },
    function (err, user) {
      return done(null, user);
    }
  );
}

module.exports = authenticateUser;
