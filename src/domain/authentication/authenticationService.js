const InvalidArgumentError = require('../error/InvalidArgumentError');
const User = require('../user/User');
const cacheProvider = require('../../infrastructure/cache');
const emailProvider = require('../../infrastructure/email');
const userRepository = require('../user/UserRepository');
const base64json = require('base64json');
const uuid = require('uuid/v4');

// FIXME : Do not store secrets as string literals in the code
const applicationSecret = "967dff22-2017-4fc3-9183-016193ba1f7d"

class AuthenticationService {

	async createSignUpReference(userParameters) {

		const { username, email, passwordLiteral } = userParameters;
		const referenceSecret = uuid();

		const user = userRepository.build({ username, email, passwordLiteral });
		const token = user.getBarearToken(referenceSecret + applicationSecret, { 
			username: user.username,
			email: user.email,
			passwordHash: user.passwordHash
		});

		const key = user.username;
		return Promise.all([
			cacheProvider.setex(`USER_SIGN_UP_${key}`, token, 3600),
			emailProvider.send(base64json.stringify({ key, referenceSecret }))
		]);
	}

	async validateSignUpReference(encodedPayload) {

		const decodedPayload = base64json.parse(encodedPayload);
		if(!decodedPayload) throw new InvalidArgumentError();

		const validationToken = await cacheProvider.get(`USER_SIGN_UP_${decodedPayload.key}`);
		if(!validationToken) throw new InvalidArgumentError();
		await cacheProvider.delete(`USER_SIGN_UP_${decodedPayload.key}`);

		const decodedToken = await  User.verifyToken(validationToken, decodedPayload.referenceSecret + applicationSecret);
		const alreadyCreatedUser = await userRepository.findOneByEmail(decodedToken.email);
		if(alreadyCreatedUser) throw new InvalidArgumentError();

		const { username, email, passwordHash } = decodedToken;
		const user = await userRepository.create({ username, email, passwordHash });

		return user;
	}

	async createPasswordResetReference(identifier) {

		const user = await userRepository.findOneByStringIdentifier(identifier);

		if(user) {

			const validationToken = await cacheProvider.get(`RESET_PASSWORD_${user.id}`);
			if(validationToken) cacheProvider.delete(`RESET_PASSWORD_${user.id}`);
	
			const referenceSecret = uuid();
			const token = user.getBarearToken(referenceSecret + applicationSecret, { identifier });
	
			await cacheProvider.setex(`RESET_PASSWORD_${user.id}`, token, 1200);
			await emailProvider.send(base64json.stringify({ identifier, referenceSecret }));
		}
	}

	async resetPassword(encodedPayload, passwordLiteral) {

		const decodedPayload = base64json.parse(encodedPayload);
		if(!decodedPayload) throw new InvalidArgumentError();

		const user = await userRepository.findOneByStringIdentifier(decodedPayload.identifier);
		if(!user) throw new InvalidArgumentError();

		const validationToken = await cacheProvider.get(`RESET_PASSWORD_${user.id}`);
		if(!validationToken) throw new InvalidArgumentError();

		await User.verifyToken(validationToken, decodedPayload.operationSecret + applicationSecret);

		user.passwordLiteral = passwordLiteral;
		await user.hashPassword();
		await user.save();
	}
}

module.exports = new AuthenticationService();