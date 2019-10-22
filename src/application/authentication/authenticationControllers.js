const { User } = require('../../domain');
const base64 = require('../utils/base64');
const RequestError = require('../error/RequestError');
const cache = require('../../infrastructure/cash');
const email = require('../../infrastructure/mailer');
const uniqid = require('uniqid');

module.exports = {

	signIn: (req, res, next) => {
		User.verifyCredentials(req.body.identifier, req.body.password)
		.then(user => user ? res.status(200).send({ token : user.getBarearToken() }) : new RequestError(401).throw())
		.catch(err => next(err));
	},

	signUp: (req, res, next) => {
		
		cache.get(`UserSignUp:${req.body.username}`)
		.then(result => !result ? User.findOneByUsername(req.body.username) : new RequestError(422, { message : 'Username already in use' }).throw())
		.then(result => !result ? User.findOneByEmail(req.body.email) : new RequestError(422, { message : 'Username already in use' }).throw())
		.then(result => !result ? User.build(req.body).hashPassword() : new RequestError(422, { message : 'Email already in use' }).throw())
		.then(user => {
			
			const secret = uniqid();
			const key = user.username;
			const payload = { username: user.username, email: user.email, passwordHash: user.passwordHash }
			const token = user.getBarearToken(secret, payload);

			Promise.all([
				cache.setex(`UserSignUp:${key}`, token, 3600),
				console.log("Your verification code is: " + base64.encodeJson({ key, secret }))
				// email.send(base64.encodeJson({ key, secret }))
			]).then(() => res.status(200).send());

		}).catch(err => next(err));
	},

	validate: (req, res, next) => {
        new RequestError(501).thorw();
	}
}





const validationPayload = base64.decodeJson(req.params.payload);
console.log('validationPayload', validationPayload)
// 	cache.get(`UserSignUp:${validationPayload.key}`)
// 	.then(validationCache => {

// 		if(!validationCache) return new RequestError(422, 'Expired token').throw();
// 		User.verifyToken(validationCache.token, validationPayload.secret)
// 		.then(decodedToken => decodedToken ? User.findOneByEmail(decodedToken.email) : new RequestError(422, 'Invalid token').throw())
// 		.then(user => {
// 			console.log(decodedToken)
// 			if (user) return new RequestError(422, 'Invalid token').throw();
// 			User.build(decodedToken.payload)
// 			.then(user => user.save())
// 			.then(user => user.getBarearToken())
// 			.then(token => res.status(200).send({ token }))
// 		})
// 	})
// 	.catch(err => next(err));