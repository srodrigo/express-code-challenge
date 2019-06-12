const request = require('supertest');
const expect = require('mocha').chai;

const app = require('../../server');
const User = require('../../models/user');
const Institution = require('../../models/institution');
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
    await testDb.cleanInstitutions();
  });

  it('authenticates an existing user', async () => {
    await User
      .create({
        email: 'validuser@testinstitution.com',
        password: 'd2bf02e60ed38af96751c5a78a8ffbe32f4598f9',
        name: 'username',
        role: 'student'
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

  it('creates a new user', async () => {
    await Institution
      .create({
        name: 'test institution',
        url: 'http://mytestinstitution.com',
        emailDomain: 'testinstitution.com'
      });

    const email = 'newuser@testinstitution.com';
    const password = 'testpass123';
    const username = 'test username';
    const role = 'student';

    await request(app)
      .post('/users/create')
      .set('Accept', 'application/json')
      .send({
        email: email,
        password: password,
        name: username,
        role: role
      })
      .expect('Content-Type', /json/)
      .expect(200, {
        status: 'success',
        data: {}
      });
  });
});
