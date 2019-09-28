const ApplicationError = require("../errors/ApplicationError");
const { User } = require("../models");

module.exports = {

  findOneById: (request, response) => {
    User.findOne({ where: { id : req.params.id }})
    .then(user => user ? response.status(200).send(user) : new ApplicationError({ status: 204 }).throw())
    .catch(error => ApplicationError.send(response, error));
  },

  create: (request, response) => {
    User.create(request.body)
    .then(user => response.status(200).send(user))
    .catch(error => ApplicationError.send(response, error));
  },

  signIn: (request, response) => {
    User.verifyCredentials(request.body.email, request.body.password)
    .then(user => user ? response.status(200).send({ token : user.getBarearToken() }) : new ApplicationError({ status: 400 }).throw())
    .catch(error => ApplicationError.send(response, error));
  },

  signUp: (request, response) => {
    User.findOneByEmail(request.body.email)
    .then(result => !result ? User.build(request.body) : new ApplicationError({ status: 422 }).throw())
    .then(user => user.hashPassword())
    .then(user => user.save())
    .then(user => user.getBarearToken())
    .then(token => response.status(200).send({ token }))
    .catch(error => ApplicationError.send(response, error));
  }
}