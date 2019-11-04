const EntityRepository = require('../entity/EntityRepository');
const { User } = require('../../infrastructure/database');
const Op = require('sequelize').Op;


class UserRepository extends EntityRepository {

	constructor() {
		super(User);
	}

	findOrderedBy(column="email", offset, limit=2) {
		return super.findOrderedBy(column, offset, limit);
	}
	
	findOneByEmail(email) {
		return User.findOne({ 
			where: { email } 
		});
	}

	findOneByUsername(username) {
		return User.findOne({
			where : { username }
		});
	}

	findOneByStringIdentifier(stringIdentifier) {
		return User.findOne({
			where: { [Op.or] : { username: stringIdentifier, email: stringIdentifier } }
		});
	}

}

module.exports = (module) => new UserRepository();