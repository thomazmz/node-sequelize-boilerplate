'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Authority', [
			{ name: 'ReadUsersRoles', created_at: new Date(), updated_at: new Date()},
			{ name: 'UpdateUsersRoles', created_at: new Date(), updated_at: new Date()},
			{ name: 'ReadRoles', created_at: new Date(), updated_at: new Date()},
			{ name: 'CreateRoles', created_at: new Date(), updated_at: new Date()},
			{ name: 'UpdateRoles', created_at: new Date(), updated_at: new Date()}
		]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authority', null, {})
  }
};