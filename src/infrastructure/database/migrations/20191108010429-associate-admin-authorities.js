'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
    	return Promise.all([		
			queryInterface.sequelize.query( 
				`SELECT * from "Authority" WHERE name IN (` +
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
			const authorities = results[0];
			const role = results[1][0];
			const authoritiesByRole = [];
			authorities.forEach(authority => {
				authoritiesByRole.push({
					role_id: role.id,
					authority_id: authority.id
				})
			})
			return queryInterface.bulkInsert('AuthorityByRole', authoritiesByRole);
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('AuthorityByRole', null, {});	
	}
};
