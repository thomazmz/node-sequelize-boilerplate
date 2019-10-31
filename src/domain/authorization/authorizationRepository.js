const { Authorization } = require('../../infrastructure/database');
const Op = require('sequelize').Op;

class AuthorizationRepository {

	findByNames = function(names) {
		return Authorization.findAll({
			where: { name: { [Op.or]: names } }
		});
	}

}

return new AuthorizationRepository();