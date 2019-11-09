'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('AuthorityByRole', {
			role_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Role', key: 'id' },
				onDelete: 'CASCADE',
				primaryKey: true
			},
			authority_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Authority', key: 'id' },
				onDelete: 'CASCADE',
				primaryKey: true
			},
		}).then(() => {
			return queryInterface.addConstraint('AuthorityByRole', ['role_id', 'authority_id'], {
				type: 'unique'
			})
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('PermisionByRole');
	}
};
