const Institution = require('../models/institution');
const Book = require('../models/book');

function getByInstitutionDomain(emailDomain) {
  return Institution
    .findOne({ emailDomain: emailDomain })
    .populate('books');
}

module.exports = {
  getByInstitutionDomain: getByInstitutionDomain
};
