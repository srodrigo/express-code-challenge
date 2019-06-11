const expect = require('chai').expect;
const mongoose = require('mongoose');

const authenticateUser = require('../../auth/authenticateUser');
const User = require('../../models/user');

mongoose.Promise = global.Promise;

describe('Authenticate User', () => {
  before(() => {
    mongoose.set('useNewUrlParser', true);
    mongoose.connect('mongodb://localhost:27017/testbooksdb');
    mongoose.connection
      .once('open', () => console.log('Connected!'))
      .on('error', (error) => {
        console.warn('Error : ',error);
      });
  });

  after(() => {
    mongoose.disconnect();
  });

  beforeEach(done => {
    User
      .deleteMany({})
      .then(() => {
        done();
      });
  });

  it('authenticates user with correct password', async () => {
    const username = 'validuser@testinstitution.com';
    const password = 'mypass123';
    const expectedUser = {
      email: 'validuser@testinstitution.com',
      password: 'd2bf02e60ed38af96751c5a78a8ffbe32f4598f9'
    };

    const authDone = function (err, user) {
      expect(err).to.equal(null);
      expect(user.email).to.deep.equal(expectedUser.email);
      expect(user.password).to.deep.equal(expectedUser.password);
    };

    await User
      .create({
        email: 'validuser@testinstitution.com',
        password: 'd2bf02e60ed38af96751c5a78a8ffbe32f4598f9'
      });

    authenticateUser(username, password, authDone);
  });
});
