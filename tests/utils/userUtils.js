const { sequelize } = require('../../src/infrastructure/database');
const { User } = require('../../src/infrastructure/database');
const uuid = require('uuid/v4');

class UserTestUtils {
	
	static async createMany(numberOfUsers, users) {
		users = users || [];
		if(numberOfUsers > 0) {
			const user = await UserTestUtils.create();
			users.push(user);
			return await UserTestUtils.createMany(numberOfUsers-1, users);
		} else {
			return users;
		}
	}

	static async create(optionalParams) {
		const userParams = UserTestUtils.getParameters(optionalParams);
		const user = await User.build(userParams);
		await user.hashPassword();
		await user.save();
		return user;
	}

	static async build(userParams) {
		userParams = UserTestUtils.getParameters(userParams);
		const user = User.build(userParams);
		return user;
	}

	static getParameters(optionalParams) {
		const identifier = uuid();
		return {
			username: optionalParams && optionalParams.username ? optionalParams.username : `${identifier}`,
			email: optionalParams && optionalParams.email ? optionalParams.email : `${identifier}@email.com`,
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