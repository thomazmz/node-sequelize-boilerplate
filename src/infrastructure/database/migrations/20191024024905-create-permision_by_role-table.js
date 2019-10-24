'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
    	return queryInterface.createTable('PermisionByRole', {
      		role_id: {
        		type: Sequelize.INTEGER,
        		allowNull: false,
        		references: { model: 'Role', key: 'id' }
      		},
			permision_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Permision', key: 'id' }
			}
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PermisionByRole');
  }
};