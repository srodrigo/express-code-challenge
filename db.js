const mongoose = require('mongoose');

function connect() {
  mongoose.set('useNewUrlParser', true);
  mongoose.connect('mongodb://localhost:27017/booksdb', { useCreateIndex: true });
  mongoose.connection
    .once('open', () => console.log('Connected to Mongo DB!'))
    .on('error', (error) => {
      console.warn('Error : ',error);
    });
}

module.exports = {
  connect: connect
};
