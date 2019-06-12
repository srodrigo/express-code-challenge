const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Institution = mongoose.model(
  'Institution',
  new Schema({
    name: {
      type: String,
      required: [true, 'Name is required.']
    },
    url: {
      type: String,
      required: [true, 'URL is required.']
    },
    emailDomain: {
      type: String,
      required: [true, 'Email Domain is required.'],
      unique: true
    },
    books: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }]
  })
);

module.exports = Institution;
