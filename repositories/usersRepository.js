const User = require('../models/user');

function create(user) {
  return User.create(user);
}

module.exports = {
  create: create
};
