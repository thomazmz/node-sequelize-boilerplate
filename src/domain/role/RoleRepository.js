const { Role } = require('../../infrastructure/database');
const EntityRepository = require('../entity/EntityRepository');

class RoleRepository extends EntityRepository {

	constructor() {
		super(Role);
	}

}

module.exports = new RoleRepository();