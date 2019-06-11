const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const index = require('./routes/index.js');
const usersRoutes = require('./routes/users');
const authenticateUser = require('./auth/authenticateUser');

passport.use(new LocalStrategy(authenticateUser));

app.get('/', index);
app.post('/users/signin',
  passport.authenticate('local'),
  usersRoutes.signin
);

module.exports = app;
