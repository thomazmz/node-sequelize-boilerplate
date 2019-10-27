'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query(
			`SELECT * from "Role" WHERE name = 'Admin'`,
			{ type: queryInterface.sequelize.QueryTypes.SELECT }
		).then(results => {
			const role = results[0];
			return queryInterface.bulkInsert('User', [{
				username: "admin",
				email: "admin@zandonotto.com",
				password_hash: "temporary",
				role_id: role.id,
				created_at:  new Date(),
				updated_at:  new Date()
			}]);
		})
	},

  down: (queryInterface, Sequelize) => {
	return queryInterface.bulkDelete('User', null, {});
  }
};