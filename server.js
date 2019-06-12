const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const usersRoutes = require('./routes/users');
const authenticateUser = require('./auth/authenticateUser');
const institutionsRepository = require('./repositories/institutionsRepository');
const usersRepository = require('./repositories/usersRepository');
const booksRoutes = require('./routes/books');
const booksRepository = require('./repositories/booksRepository');

const app = express();

app.use(bodyParser.json());

app.use(session({
  secret: 'mysecret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('local-login', new LocalStrategy(
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

app.post('/users/signin',
  passport.authenticate('local-login'),
  usersRoutes.signin
);

app.post('/users/create',
  usersRoutes.create(institutionsRepository, usersRepository)
);

app.get('/books',
  isLoggedIn,
  booksRoutes.getUserBooks(booksRepository)
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401);
  res.end();
  // TODO: Return message
}

module.exports = app;
