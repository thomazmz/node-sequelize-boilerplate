const UserRepository = require('./UserRepository')

class UserService {

	verifyCredentials = (stringIdentifier, plainPassword) => {
		return new Promise((resolve) => {
			UserRepository.findOneByStringIdentifier(stringIdentifier)
			.then(user => !user ? resolve(null) : user.verifyPassword(plainPassword))
			.then(result => result ? resolve(result) : resolve(null));
		});
	}

}

return new UserService();