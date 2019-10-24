module.exports = (sequelize, Sequelize) => {

	const Permision = sequelize.define('Permision', {
		name: Sequelize.STRING
	});

	Permision.associate = (models) => {
		Permision.belongsToMany(models.Role, {
			as: 'roles',
			through : 'PermisionByRole',
			foreignKey : 'permisionId'
		});
	};

	return Role;

}