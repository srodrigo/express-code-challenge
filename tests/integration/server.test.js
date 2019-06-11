const request = require('supertest');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const app = require('../../server');
const User = require('../../models/user');
const testDb = require('../testDb');

mongoose.Promise = global.Promise;

describe('Users', () => {
  before(() => {
    testDb.connect();
  });

  after(async () => {
    testDb.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({})
  });

  it('authenticates an existing user', async done => {
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
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});
