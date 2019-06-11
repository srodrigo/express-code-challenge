const request = require('supertest');
const expect = require('mocha').chai;

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

  it('creates a new user', () => {
    const email = 'newuser@testinstitution.com';
    const password = 'testpass123';
    const username = 'test username';
    const role = 'student';

    request(app)
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
      })
      .end((err, res) => {
        if (err) throw err;
        User.findOne(
          { email: email },
          function (err, user) {
            expect(user.email).to.equal(email);
            expect(user.password).to.equal(password);
            expect(user.username).to.equal(username);
            expect(user.role).to.equal(role);
          }
        );
      });
  });
});
