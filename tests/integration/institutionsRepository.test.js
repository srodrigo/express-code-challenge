const expect = require('chai').expect;

const institutionsRepository = require('../../repositories/institutionsRepository');
const Institution = require('../../models/institution');
const testDb = require('../testDb');

describe('Institutions repository', () => {
  before(() => {
    testDb.connect();
  });

  after(async () => {
    await testDb.disconnect();
  });

  beforeEach(async () => {
    await testDb.cleanInstitutions();
  });

  describe('Get Id By Domain', () => {
    it('returns institution id if domain exists', async () => {
      const domain = 'testinstitution.com';
      await Institution
        .create({
          name: 'test institution',
          url: 'http://mytestinstitution.com',
          emailDomain: domain
        });

      const id = await institutionsRepository.getIdByDomain(domain);

      expect(id).not.to.equal(null);
    });

    it('returns null id if domain does not exist', async () => {
      await Institution
        .create({
          name: 'test institution',
          url: 'http://mytestinstitution.com',
          emailDomain: 'testinstitution.com'
        });

      const id = await institutionsRepository.getIdByDomain('nonexistingdomain.com');

      expect(id).to.equal(null);
    });
  });
});
