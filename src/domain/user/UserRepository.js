const { User } = require('../../infrastructure/database');
const EntityRepository = require('../entity/EntityRepository');
const Op = require('sequelize').Op;

class UserRepository extends EntityRepository {

	constructor() {
		console.log('teste', typeof User)
		super(User);
	}

	findOrderedBy(column="email", offset, limit=2) {
		return User.findAndCountAll({
			order: [[column, 'ASC']],
			limit: limit,
			offset: offset
		 })
	}

	findOneById(id) {
		return User.findOne({
			where: { id }
		});
	}

	findOneByEmail(email) {
		return User.findOne({ 
			where: { email } 
		});
	}

	findOneByUsername(username) {
		return User.findOne({
			where : { username }
		})
	}

	findOneByStringIdentifier(stringIdentifier) {
		return User.findOne({
			where: { [Op.or] : { username: stringIdentifier, email: stringIdentifier } }
		});
	}

}

module.exports = new UserRepository();