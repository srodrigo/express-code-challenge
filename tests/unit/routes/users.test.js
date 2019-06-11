const expect = require('chai').expect;

const usersRoutes = require('../../../routes/users');

describe('Users routes', () => {
  it('authenticates an existing user', () => {
    const req = {
      body: {
        email: 'validuser@testinstitution.com',
        password: 'mypass123'
      }
    };
    const expectedRes = {
      status: 'success',
      data: {}
    };
    const res = {
      jsonCalledWith: '',
      json: function (data) {
        this.jsonCalledWith = data;
      }
    };

    usersRoutes.signin(req, res);

    expect(res.jsonCalledWith).to.deep.equal(expectedRes);
  });
});
