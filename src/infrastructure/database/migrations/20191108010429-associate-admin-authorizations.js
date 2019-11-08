'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
    	return Promise.all([		
			queryInterface.sequelize.query( 
				`SELECT * from "Authorization" WHERE name IN (` +
				`'ReadUsersRoles',` +
				`'UpdateUsersRoles',` +
				`'ReadRoles',` +
				`'CreateRoles',` +
				`'UpdateRoles')`,
				{ type: queryInterface.sequelize.QueryTypes.SELECT }
			),
			queryInterface.sequelize.query(
				`SELECT * FROM "Role" WHERE name = 'Admin'`, 
				{ type: queryInterface.sequelize.QueryTypes.SELECT }
			)
		]).then((results) => {
			const authorizations = results[0];
			const role = results[1][0];
			const authorizationsByRole = [];
			authorizations.forEach(authorization => {
				authorizationsByRole.push({
					role_id: role.id,
					authorization_id: authorization.id
				})
			})
			return queryInterface.bulkInsert('AuthorizationByRole', authorizationsByRole);
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('AuthorizationByRole', null, {});	
	}
};
