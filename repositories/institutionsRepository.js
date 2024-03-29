const Institution = require('../models/institution');

function getIdByDomain(emailDomain) {
  return Institution
    .findOne({ emailDomain: emailDomain })
    .then(institution =>
      institution === null
        ? null
        : institution._id
    );
}

module.exports = {
  getIdByDomain: getIdByDomain
};
