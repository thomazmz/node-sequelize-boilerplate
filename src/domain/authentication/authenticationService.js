const cacheProvider = require('../../infrastructure/cache');
const emailProvider = require('../../infrastructure/email');
const userRepository = require('../user/UserRepository');
const base64json = require('base64json');
const uuidv4 = require('uuid/v4');

class AuthenticationService {

	createSignUpReference(username, email, passwordLiteral) {
		
		const secret = uuidv4();

		const user = userRepository.build({ username, email, passwordLiteral });
		const token = user.getBarearToken(secret, { 
			username: user.username,
			email: user.email,
			passwordHash: user.passwordHash
		});

		const key = user.username;
		return Promise.all([
			cacheProvider.setex(`UserSignUp:${key}`, token, 3600),
			emailProvider.send(base64json.stringify({ key, secret }))
		]);
	}

	validateSignUpReference(encodedPayload) {
		return new Promise((resolve, reject) => {
			reject('Custom Error Message')
		});
	}
}

module.exports = new AuthenticationService();