const expect = require('chai').expect;

const usersRepository = require('../../repositories/usersRepository');
const User = require('../../models/user');
const Institution = require('../../models/institution');
const testDb = require('../testDb');

describe('Users repository', () => {
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

  it('creates user with institution', async () => {
    const institution = await Institution
      .create({
        name: 'test institution',
        url: 'http://mytestinstitution.com',
        emailDomain: 'testinstitution.com'
      });
    const email = 'validuser@testinstitution.com';
    const newUser = {
      email: email,
      password: 'd2bf02e60ed38af96751c5a78a8ffbe32f4598f9',
      name: 'username',
      role: 'student',
      institution: institution._id
    };

    await usersRepository.create(newUser);

    const createdUser = await User.findOne({ email: email });
    expect(createdUser.email).to.equal(newUser.email);
    expect(createdUser.password).to.equal(newUser.password);
    expect(createdUser.name).to.equal(newUser.name);
    expect(createdUser.role).to.equal(newUser.role);
    expect(createdUser.institution).to.deep.equal(newUser.institution);
  });
});
