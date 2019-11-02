const EntityRepository = require('../entity/EntityRepository');
const { Authorization } = require('../../infrastructure/database');
const Op = require('sequelize').Op;

class AuthorizationRepository extends EntityRepository {

	constructor() {
		super(Authorization);
	}

	findByNames(names) {
		return Authorization.findAll({
			where: { name: { [Op.or]: names } }
		});
	}

}

module.exports = new AuthorizationRepository();