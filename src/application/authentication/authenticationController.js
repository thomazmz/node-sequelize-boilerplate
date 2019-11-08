const InvalidArgumentError = require('../../domain/error/InvalidArgumentError');
const RequestError = require('../error/RequestError');

const authenticationService = require('../../domain/authentication/AuthenticationService');
const userRepository = require('../../domain/user/UserRepository');
const cacheProvider = require('../../infrastructure/cache');

module.exports = {

	signIn: (req, res, next) => {
		User.verifyCredentials(req.body.identifier, req.body.password)
		.then(user => user ? res.status(200).send({ token : user.getBarearToken() }) : 
			new RequestError(401).throw())
		.catch(err => next(err));
	},
	
	signUp: (req, res, next) => {
		cacheProvider.get(`USER_SIGN_UP_${req.body.username}`)
		.then(user => !user ? userRepository.findOneByUsername(req.body.username) : 
			new RequestError(422, { message : 'Username already in use.' }).throw())
		.then(user => !user ? userRepository.findOneByEmail(req.body.email) : 
			new RequestError(422, { message : 'Username already in use.' }).throw())
		.then(user => !user ? authenticationService.createSignUpReference(req.body) : 
			new RequestError(422, { message : 'Email already in use.' }).throw())
		.then(() => res.status(200).send())
		.catch(err => next(err));
	},

	validate: (req, res, next) => {
		authenticationService.validateSignUpReference(req.params.payload)
		.then(user => user.getBarearToken())
		.then(token => res.status(200).send({ token }))
		.catch(err => {
			if (err instanceof InvalidArgumentError) next(new RequestError(422, { message : 'Invalid token.' }));
			else next(err);
		});
	}
}