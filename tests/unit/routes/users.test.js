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
      sendCalledWith: '',
      send: function (data) {
        this.sendCalledWith = data;
      }
    };
    usersRoutes.signin(req, res);

    expect(res.sendCalledWith).to.deep.equal(expectedRes);
  });
});
