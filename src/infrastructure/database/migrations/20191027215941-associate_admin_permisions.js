'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
    	return Promise.all([		
			queryInterface.sequelize.query( 
				`SELECT * from "Permision" WHERE name IN (`
				+ `'ReadUsersRoles',`
				+ `'UpdateUsersRoles',`
				+ `'ReadRoles',`
				+ `'CreateRoles',` 
				+ `'UpdateRoles')`, 
				{ type: queryInterface.sequelize.QueryTypes.SELECT }
			),
			queryInterface.sequelize.query(
				`SELECT * FROM "Role" WHERE name = 'Admin'`, 
				{ type: queryInterface.sequelize.QueryTypes.SELECT }
			)
		]).then((results) => {
			const permisions = results[0];
			const role = results[1][0];
			const permisionByRole = [];
			permisions.forEach(permision => {
				permisionByRole.push({
					role_id: role.id,
					permision_id: permision.id,
					created_at:  new Date(),
					updated_at:  new Date()
				})
			})
			return queryInterface.bulkInsert('PermisionByRole', permisionByRole);
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('PermisionByRole', null, {});	
	}
};

