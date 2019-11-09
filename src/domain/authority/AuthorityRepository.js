const EntityRepository = require('../entity/EntityRepository');
const { Authority } = require('../../infrastructure/database');
const Op = require('sequelize').Op;

class AuthorityRepository extends EntityRepository {

	constructor() {
		super(Authority);
	}

	findByNames(names) {
		return Authority.findAll({
			where: { name: { [Op.or]: names } }
		});
	}

}

module.exports = new AuthorityRepository();
