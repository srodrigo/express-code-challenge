const expect = require('chai').expect;

const authenticateUser = require('../../auth/authenticateUser');
const User = require('../../models/user');
const testDb = require('../testDb');

describe('Authenticate User', () => {
  before(() => {
    testDb.connect();
  });

  after(async () => {
    await testDb.disconnect();
  });

  beforeEach(async () => {
    await testDb.cleanUsers();
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
