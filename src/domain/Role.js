module.exports = (sequelize, Sequelize) => {

	const Role = sequelize.define('Role', {
		name: Sequelize.STRING
	});

	Role.associate = (models) => {
		Role.belongsToMany(models.Permision, {
			as: 'permisions',
			through : 'PermisionByRole',
			foreignKey : 'roleId'
		});
	}

	return Role;

}