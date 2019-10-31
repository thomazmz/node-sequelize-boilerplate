const { Role } = require('../../infrastructure/database');
const Op = require('sequelize').Op;

class RoleRepository {

	findByName = function(name) {
		return Role.findOne({ 
            where: { name } 
        });
	}

}

return new RoleRepository();