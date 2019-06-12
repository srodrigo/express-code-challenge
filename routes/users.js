const sha1 = require('sha1');

function signin(req, res) {
  res.json({
    status: 'success',
    data: {}
  });
}

function create(institutionsRepository, usersRepository) {
  return (req, res) => {
    return institutionsRepository
      .getIdByDomain(req.body.email.split('@')[1])
      .then(institution => {
        if (institution === null) {
          res.status(400);
          res.json({
            status: 'fail',
            data: {
              message: 'The email domain provided does not match any institution'
            }
          });
        }
        else {
          return usersRepository
            .create({
              email: req.body.email,
              password: sha1(req.body.password),
              name: req.body.name,
              role: req.body.role,
              institution: institution
            })
            .then(user => {
              res.json({
                status: 'success',
                data: {}
              });
            })
            .catch(error => console.log(error))
        }
      })
      .catch(error => console.log(error));
  }
}

module.exports = {
  signin: signin,
  create: create
};
