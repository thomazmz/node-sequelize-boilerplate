const RequestError = require('../errors/RequestError');
const { User } = require('../models');

module.exports = {

    findOneById: (req, res, next) => {
      User.findOne({ where: { id : req.params.id }})
      .then(user => user ? res.status(200).send(user) : new RequestError(404).throw())
      .catch(err => next(err));
  }

}

module.exports = new App();