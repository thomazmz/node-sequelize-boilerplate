const cacheProvider = require('../../infrastructure/cache');
const emailProvider = require('../../infrastructure/database');
const userRepository = require('../user/UserRepository');
const uniqid = require('uniqid');

class UserService {

	createSignUpReference(username, email, passwordLiteral) {

		const user = userRepository.build({ username, email, passwordLiteral });
		const token = user.getBarearToken(secret, { 
			username: user.username,
			email: user.email,
			passwordHash: user.passwordHash
		});

		const secret = uniqid();
		const key = user.username;
		return Promise.all([
			cacheProvider.setex(`UserSignUp:${key}`, token, 3600),
			emailProvider.send(base64.encodeJson({ key, secret }))
		]);
	}
}

module.exports = new UserService();