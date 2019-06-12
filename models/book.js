const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = mongoose.model(
  'Book',
  new Schema({
    isbn: {
      type: String,
      required: [true, 'ISBN is required.']
    },
    title: {
      type: String,
      required: [true, 'Title is required.']
    },
    author: {
      type: String,
      required: [true, 'Author is required.']
    },
    institution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Institution'
    }
  })
);

module.exports = Book;
