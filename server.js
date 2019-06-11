const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const index = require('./routes/index.js');
const usersRoutes = require('./routes/users');
const authenticateUser = require('./auth/authenticateUser');

const app = express();

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  authenticateUser
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/', index);
app.post('/users/signin',
  passport.authenticate('local'),
  usersRoutes.signin
);

module.exports = app;
