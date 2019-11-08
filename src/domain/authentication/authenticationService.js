const InvalidArgumentError = require('../error/InvalidArgumentError');
const User = require('../user/User');

const cacheProvider = require('../../infrastructure/cache');
const emailProvider = require('../../infrastructure/email');
const userRepository = require('../user/UserRepository');

const base64json = require('base64json');
const uuid = require('uuid/v4');

class AuthenticationService {

	createSignUpReference(userParameters) {

		const { username, email, passwordLiteral } = userParameters;
		const secret = uuid();

		const user = userRepository.build({ username, email, passwordLiteral });
		const token = user.getBarearToken(secret, { 
			username: user.username,
			email: user.email,
			passwordHash: user.passwordHash
		});

		const key = user.username;
		return Promise.all([
			cacheProvider.setex(`USER_SIGN_UP_${key}`, token, 3600),
			emailProvider.send(base64json.stringify({ key, secret }))
		]);
	}

	validateSignUpReference(encodedPayload) {
		return new Promise(async (resolve, reject) => {

			try {
				const decodedPayload = base64json.parse(encodedPayload);
				if(!decodedPayload) reject(new InvalidArgumentError('Malformed payload'));

				const validationToken = await cacheProvider.get(`USER_SIGN_UP_${decodedPayload.key}`)
				if(!validationToken) reject(new InvalidArgumentError('Invalid payload'));
				
				const decodedToken = await  User.verifyToken(validationToken, decodedPayload.secret);
				const alreadyCreatedUser = await userRepository.findOneByEmail(decodedToken.email);
				if(alreadyCreatedUser) reject(new InvalidArgumentError('Invalid payload'));

				const { username, email, passwordHash } = decodedToken;
				const user = userRepository.create({ username, email, passwordHash });

				resolve(user);

			} catch(err) {
				reject(err);

			}

		});
	}
}

module.exports = new AuthenticationService();