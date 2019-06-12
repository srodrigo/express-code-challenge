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
    },
    name: {
      type: String,
      required: [true, 'Name is required.']
    },
    role: {
      type: String,
      enum: ['student', 'academic', 'administrator'],
      required: [true, 'Role is required.']
    },
    institution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Institution'
    }
  })
);

module.exports = User;
