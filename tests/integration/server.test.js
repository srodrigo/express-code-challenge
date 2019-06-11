const request = require('supertest');
const expect = require('chai').expect;

const app = require('../../server');

describe('Users', () => {
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
