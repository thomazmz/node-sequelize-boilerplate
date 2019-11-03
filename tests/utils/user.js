const { sequelize } = require('../../src/infrastructure/database');
const { User } = require('../../src/infrastructure/database');
const uniqid = require('uniqid');

class UserTestUtils {
	
	static async createMany(numberOfUsers) {
		if(numberOfUsers > 0) {
			await UserTestUtils.ceateUser();
			UserTestUtils.createMany(numberOfUsers-1);
		}
	}

	static async create(optionalParams) {
		const userParams = UserTestUtils.getParameters(optionalParams);
		const user = await User.build(userParams);
		user.save();
		return user;
	}

	static async build(userParams) {
		userParams = UserTestUtils.getParameters(userParams);
		const user = User.build(userParams);
		await user.hashPassword();
		return user;
	}

	static getParameters(optionalParams) {
		const identifier = uniqid();
		return {
			username: optionalParams && optionalParams.username ? optionalParams.username : `Mary Doe ${identifier}`,
			email: optionalParams && optionalParams.email ? optionalParams.email : `mary.doe.${identifier}@email.com`,
			passwordLiteral: optionalParams && optionalParams.passwordLiteral ? optionalParams.passwordLiteral : identifier
		}
	}

	// FIXME : Remove this method from this class passing it to a more general scope.
	static truncate() {
		return Promise.all(Object.keys(sequelize.models).map(key => {
			return sequelize.models[key].destroy({ truncate: true, force: true });
		}))
	}
}

module.exports = UserTestUtils;