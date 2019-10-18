const RequestError = require('../errors/RequestError');
const { User } = require('../models');

module.exports = {

  	findOneById: (req, res, next) => {
		User.findOne({ where: { id : req.params.id }})
		.then(user => user ? res.status(200).send(user) : new RequestError(404).throw())
		.catch(err => next(err));
	},

	findUserTasks: (req, res, next) => {
        new RequestError(501).thorw();
	},

	findUserTask:  (req, res, next) => {
        new RequestError(501).thorw();
	},
	  
  	signIn: (req, res, next) => {
    	User.verifyCredentials(req.body.identifier, req.body.password)
		.then(user => user ? res.status(200).send({ token : user.getBarearToken() }) : new RequestError(401).throw())
		.catch(err => next(err));
  	},

	signUp: (req, res, next) => {
		User.findOneByEmail(req.body.email)
		.then(result => !result ? User.build(req.body) : new RequestError(422).throw())
		.then(user => user.hashPassword())
		.then(user => user.save())
		.then(user => user.getBarearToken())
		.then(token => res.status(200).send({ token }))
		.catch(err => next(err));
  	}
}