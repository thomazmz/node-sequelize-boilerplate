const userRepository = require('./UserRepository')

class UserService {

	verifyCredentials = (stringIdentifier, plainPassword) => {
		return new Promise((resolve) => {
			userRepository.findOneByStringIdentifier(stringIdentifier)
			.then(user => !user ? resolve(null) : user.verifyPassword(plainPassword))
			.then(result => result ? resolve(result) : resolve(null));
		});
	}

}

module.exports = new UserService();