const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function connect() {
  mongoose.set('useNewUrlParser', true);
  mongoose.connect('mongodb://localhost:27017/testbooksdb');
  mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
      console.warn('Error : ',error);
    });
}

async function disconnect() {
  mongoose.disconnect();
}

module.exports = {
  connect: connect,
  disconnect: disconnect
};
