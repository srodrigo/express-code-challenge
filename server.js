const express = require('express');
const app = express();

const index = require('./routes/index.js');
const usersRoutes = require('./routes/users');

app.get('/', index);
app.get('/users', usersRoutes);

module.exports = app;
