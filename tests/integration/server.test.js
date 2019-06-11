const request = require('supertest');

const app = require('../../server');
const User = require('../../models/user');
const testDb = require('../testDb');

describe('Users', () => {
  before(() => {
    testDb.connect();
  });

  after(async () => {
    await testDb.disconnect();
  });

  beforeEach(async () => {
    await testDb.cleanUsers();
  });

  it('authenticates an existing user', async () => {
    await User
      .create({
        email: 'validuser@testinstitution.com',
        password: 'd2bf02e60ed38af96751c5a78a8ffbe32f4598f9'
      });

    request(app)
      .post('/users/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'validuser@testinstitution.com',
        password: 'mypass123'
      })
      .expect('Content-Type', /json/)
      .expect(200, {
        status: 'success',
        data: {}
      })
      .end((err, res) => {
        if (err) throw err;
      });
  });
});
