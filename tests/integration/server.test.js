const request = require('supertest');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const app = require('../../server');

describe('Users', () => {
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

  it('authenticates an existing user', done => {
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
