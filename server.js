const express = require('express');
const app = express();

const index = require('./routes/index.js');

app.get('/', index);

module.exports = app;
