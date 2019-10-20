
const RequestError = require('../utils/error/RequestError');
const { User } = require('../../domain/User');
const mailer = require('../infrastructure/mailer');

module.exports = {

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
	},

	newSignUp: (req, res, next) => {
		const userParams = req.body;
		Promise.all([User.findOneByEmail(userParams.email), User.findOneByUsername(userParams.username)])
		.then(result => !result.some(element => element != null) ? signUpMetadata.find(userParams.username) : new RequestError(422).throw())
		.then(mailer.send(new ValidationEmail("token")))
		.then(res.status(200).send())


		const userParams = req.body;
		Promise.all([User.findOneByEmail(userParams.email), User.findOneByUsername(userParams.username)])
		.then(result => !result.some(element => element != null) ? signUpMetadata.find(userParams.username) : new RequestError(422).throw())
		.then(result => !result ? signUpMetadata.set(userParams) : new RequestError(422).throw())
		.then(signUpMetadata => User.getValidationToken(signUpMetadata))
		.then(validationToken => emailProvider.send(new ValidationEmail(userParams.email, validationToken)))
		.catch(err => next(err));
    }
}