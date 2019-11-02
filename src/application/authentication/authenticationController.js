const authenticationService = require('../../domain/authentication/authenticationService');

module.exports = {

	signIn(req, res, next) {

	},

	signUp(req, res, next) {

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
				email.send(base64.encodeJson({ key, secret }))
			]).then(() => res.status(200).send());

		}).catch(err => next(err));

	},

	validate(req, res, next) {

	}

}