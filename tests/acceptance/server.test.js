const request = require('supertest');

const app = require('../../server');
const User = require('../../models/user');
const Institution = require('../../models/institution');
const Book = require('../../models/book');
const testDb = require('../testDb');

describe('Users routes', () => {
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

  it('creates a new user if the institution domain exists', async () => {
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

  it('rejects a new user if the institution domain does not exist', async () => {
    await Institution
      .create({
        name: 'test institution',
        url: 'http://mytestinstitution.com',
        emailDomain: 'differentdomain.com'
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
      .expect(400);
  });

  it('gets books for an existing user', async () => {
    const institution = await Institution
      .create({
        name: 'test institution',
        url: 'http://mytestinstitution.com',
        emailDomain: 'testinstitution.com'
      });
    await User
      .create({
        email: 'validuser@testinstitution.com',
        password: 'd2bf02e60ed38af96751c5a78a8ffbe32f4598f9',
        name: 'username',
        role: 'student'
      });
    await Book
      .create({
        isbn: '0-2331-0121-7',
        title: 'The Lord of The Rings',
        author: 'Tolkien',
        institution: institution._id
      });
    await Book
      .create({
        isbn: '0-6588-8976-1',
        title: 'A Song of Ice an Fire',
        author: 'R.R.Martin',
        institution: institution._id
      });

    request(app)
      .post('/users/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'validuser@testinstitution.com',
        password: 'mypass123'
      })
      .then(res => {
        return request(app)
          .get('/books')
          .expect('Content-Type', /json/)
          .expect(200, {
            status: 'success',
            data: {
              books: [
                { isbn: '0-2331-0121-7', title: 'The Lord of The Rings', author: 'Tolkien' },
                { isbn: '0-6588-8976-1', title: 'A Song of Ice an Fire', author: 'R.R.Martin' },
              ]
            }
          });
      });
  });
});
