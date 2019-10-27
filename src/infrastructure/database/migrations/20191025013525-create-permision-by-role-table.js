'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('PermisionByRole', {
			role_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Role', key: 'id' },
				primaryKey: true
			},
			permision_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Permision', key: 'id' },
				onDelete: 'CASCADE',
				primaryKey: true
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false
			}
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('PermisionByRole');
	}
}; 