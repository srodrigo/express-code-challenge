const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model(
  'User',
  new Schema({
    email: {
      type: String,
      required: [true, 'Email is required.']
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    }
  })
);

module.exports = User;
