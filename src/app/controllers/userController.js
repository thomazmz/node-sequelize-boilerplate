const RequestError = require("../errors/RequestError");
const { User } = require("../models");

module.exports = {

  findOneById: (req, res) => {
    User.findOne({ where: { id : req.params.id }})
    .then(user => user ? res.status(200).send(user) : new RequestError(404).throw())
    .catch(next());
  },

  signIn: (req, res) => {
    User.verifyCredentials(req.body.identifier, req.body.password)
    .then(user => user ? res.status(200).send({ token : user.getBarearToken() }) : new RequestError(400).throw())
    .catch(next());
  },

  signUp: (req, res) => {
    User.findOneByEmail(req.body.email)
    .then(result => !result ? User.build(req.body) : new RequestError(422).throw())
    .then(user => user.hashPassword())
    .then(user => user.save())
    .then(user => user.getBarearToken())
    .then(token => res.status(200).send({ token }))
    .catch(next());
  }
}