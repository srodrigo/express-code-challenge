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

  it('creates a new user', async () => {
    const req = {
      body: {
        email: 'validuser@testinstitution.com',
        password: 'mypass123',
        name: 'test username',
        role: 'student'
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
    const institutionsRepository = {
      getIdByDomain: () => Promise.resolve('test object id')
    };
    const usersRepository = {
      create: (user) => Promise.resolve(user)
    };

    await usersRoutes.create(institutionsRepository, usersRepository)(req, res);

    expect(res.jsonCalledWith).to.deep.equal(expectedRes);
  });
});
