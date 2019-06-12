const mongoose = require('mongoose');

const User = require('../models/user');
const Institution = require('../models/institution');

mongoose.Promise = global.Promise;

function connect() {
  mongoose.set('useNewUrlParser', true);
  mongoose.connect('mongodb://localhost:27017/testbooksdb', { useCreateIndex: true });
  mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
      console.warn('Error : ',error);
    });
}

function disconnect() {
  return mongoose.connection.close();
}

function cleanUsers() {
  return User.deleteMany({})
}

function cleanInstitutions() {
  return Institution.deleteMany({})
}

module.exports = {
  connect: connect,
  disconnect: disconnect,
  cleanUsers: cleanUsers,
  cleanInstitutions: cleanInstitutions
};
