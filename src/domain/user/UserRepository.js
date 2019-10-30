const User = require('../../infrastructure/database/schemas')

class UserRepository {

	findOneById = (id) => {
		return User.findOne({
			where: { id }
		});
	}

	findOneByEmail = (email) => {
		return User.findOne({ 
			where: { email } 
		});
	}

	findOneByUsername = (username) => {
		return User.findOne({
			where : { username }
		})
	}

	findOneByStringIdentifier = (stringIdentifier) => {
		return User.findOne({
			where: { [Op.or] : { username: stringIdentifier, email: stringIdentifier } }
		});
	}

}

return new UserRepository();