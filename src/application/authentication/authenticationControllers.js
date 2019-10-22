const { User } = require('../../domain');
const base64 = require('../utils/base64')
const hmac = require('../utils/hmac')
const RequestError = require('../error/RequestError');
const cache = require('../../infrastructure/cash');
const email = require('../../infrastructure/mailer')
const uniqid = require('uniqid');

module.exports = {

	signIn: (req, res, next) => {
		User.verifyCredentials(req.body.identifier, req.body.password)
		.then(user => user ? res.status(200).send({ token : user.getBarearToken() }) : new RequestError(401).throw())
		.catch(err => next(err));
	},

	signUp: (req, res, next) => {
		cache.get(`UserSignUp:${req.body.username}`)
		.then(result => !result ? User.findOneByUsername(req.body.username) : new RequestError(422, 'Username already in use'))
		.then(result => !result ? User.findOneByEmail(req.body.email) : new RequestError(422, 'Username already in use'))
		.then(result => !result ? User.build(req.body).hashPassword() : new RequestError(422, 'Email already in use'))
		.then(user => {

			const secret = uniqid();
			const key = user.username;
			const userMetadata = { username: user.username, email: user.email, passwordHash: user.passwordHash }
			const hash = hmac.encodeJson(userMetadata, secret);

			Promise.all([
				cache.setex(`UserSignUp:${key}`, { userMetadata, hash }, 20),
				email.send(base64.encodeJson({ key, secret }))
			]).then(() => res.status(200).send())	
		})
		.catch(err => next(err));
	},

	validate: (req, res, next) => {
		const validationPayload = base64.decodeJson(req.validationPayload);
		cache.get(`UserSignUp:${validationPayload.key}`)
		.then(validationCache => {
			
			if(!validationCache) return new RequestError(422, 'Expired token')
			const validationHash = hmac.decodeJson(validationCache.userMetadata, validationPayload.secret);
			if(validationCache.hash !== validationHash) return new RequestError(422, 'Invalid token');
			
			User.findOneByEmail(validationCache.userMetadata.email)
			.then(user => {
				if (user) return new RequestError(422, 'Invalid token');
				User.build(validationCache.userMetadata)
				.then(user => user.save())
				.then(user => user.getBarearToken())
				.then(token => res.status(200).send({ token }))
			})
		})
		.catch(err => next(err));
	}
}