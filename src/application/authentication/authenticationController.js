const AuthenticationService = require('../../domain/authentication/AuthenticationService');
const UserRepository = require('../../domain/user/UserRepository');
const RequestError = require('../error/RequestError');
const cacheProvider = require('../../infrastructure/cache');

module.exports = {

	signIn: (req, res, next) => {
		User.verifyCredentials(req.body.identifier, req.body.password)
		.then(user => user ? res.status(200).send({ token : user.getBarearToken() }) : new RequestError(401).throw())
		.catch(err => next(err));
	},
	
	signUp: (req, res, next) => {
		cacheProvider.get(`UserSignUp:${req.body.username}`)
		.then(user => !user ? UserRepository.findOneByUsername(req.body.username) : 
			new RequestError(422, { message : 'Username already in use' }).throw())
		.then(user => !user ? UserRepository.findOneByEmail(req.body.email) : 
			new RequestError(422, { message : 'Username already in use' }).throw())
		.then(user => !user ? UserRepository.build(req.body).hashPassword() : 
			new RequestError(422, { message : 'Email already in use' }).throw())
		.then(user => AuthenticationService.createSignUpReference(user))
		.then(() => res.status(200).send())
		.catch(err => next(err));
	},

	validate: (req, res, next) => {

		AuthenticationService.validateSignUpReference()
		.catch(err => {
			console.log(err);
		})

		// AuthenticationService.validateSignUp(req.params.payload)
		// .then(token => res.status(200).send({ token }))
		// .catch(err => next(err));
	}

}