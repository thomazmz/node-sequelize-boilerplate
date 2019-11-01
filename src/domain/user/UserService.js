const userRepository = require('./UserRepository');

class UserService {

	verifyCredentials(stringIdentifier, plainPassword) {
		return new Promise((resolve) => {
			userRepository.findOneByStringIdentifier(stringIdentifier)
			.then(user => !user ? resolve(null) : user.verifyPassword(plainPassword))
			.then(result => result ? resolve(result) : resolve(null));
		});
	}

	testService(param) {
		return userRepository.testRepository(param);
	}
}

module.exports = new UserService();