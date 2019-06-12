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
      .then(institution => usersRepository
        .create({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          role: req.body.email,
          institution: institution
        })
        .then(user => {
          res.json({
            status: 'success',
            data: {}
          });
        })
        .catch(error => console.log(error))
      )
      .catch(error => console.log(error));
  }
}

module.exports = {
  signin: signin,
  create: create
};
