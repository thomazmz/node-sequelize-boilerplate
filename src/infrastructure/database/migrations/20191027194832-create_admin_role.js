'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Role', [
			{ name: 'Admin', created_at: new Date(), updated_at: new Date() }
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Role', null, {});
	}
};