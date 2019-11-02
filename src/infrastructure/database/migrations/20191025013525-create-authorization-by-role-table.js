'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('AuthorizationByRole', {
			role_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Role', key: 'id' },
				onDelete: 'CASCADE',
				primaryKey: true
			},
			authorization_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Authorization', key: 'id' },
				onDelete: 'CASCADE',
				primaryKey: true
			},
		}).then(() => {
			return queryInterface.addConstraint('AuthorizationByRole', ['role_id', 'authorization_id'], {
				type: 'unique'
			})
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('PermisionByRole');
	}
};
