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
      jsonCalledWith: null,
      json: function (data) {
        this.jsonCalledWith = data;
      }
    };

    usersRoutes.signin(req, res);

    expect(res.jsonCalledWith).to.deep.equal(expectedRes);
  });

  it('returns success when creating user if the institution domain exists', async () => {
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
      jsonCalledWith: null,
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

  it('returns bad request when creating user if the institution domain does not exist', async () => {
    const req = {
      body: {
        email: 'validuser@testinstitution.com',
        password: 'mypass123',
        name: 'test username',
        role: 'student'
      }
    };
    const expectedRes = {
      status: 'fail',
      data: {
        message: 'The email domain provided does not match any institution'
      }
    };
    const res = {
      jsonCalledWith: null,
      statusCalledWith: null,
      json: function (data) {
        this.jsonCalledWith = data;
      },
      status: function (status) {
        this.statusCalledWith = status;
      }
    };
    const institutionsRepository = {
      getIdByDomain: () => Promise.resolve(null)
    };
    const usersRepository = {
      create: (user) => Promise.resolve(user)
    };

    await usersRoutes.create(institutionsRepository, usersRepository)(req, res);

    expect(res.statusCalledWith).to.equal(400);
    expect(res.jsonCalledWith).to.deep.equal(expectedRes);
  });

  it('creates user with encrypted password', async () => {
    const req = {
      body: {
        email: 'validuser@testinstitution.com',
        password: 'mypass123',
        name: 'test username',
        role: 'student'
      }
    };
    const res = {
      json: function (data) {}
    };
    const institutionsRepository = {
      getIdByDomain: () => Promise.resolve('test object id')
    };
    const usersRepository = {
      createCalledWith: null,
      create: function (user) {
        this.createCalledWith = user;
        return Promise.resolve(user);
      }
    };

    await usersRoutes.create(institutionsRepository, usersRepository)(req, res);

    expect(usersRepository.createCalledWith.password)
      .to.equal('d2bf02e60ed38af96751c5a78a8ffbe32f4598f9');
  });
});
