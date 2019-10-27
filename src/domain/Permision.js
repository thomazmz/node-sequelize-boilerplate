const Op = require('sequelize').Op;

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
	}

	Permision.findByNames = function(names) {
		return Permision.findAll({
			where: { name: { [Op.or]: names } }
		  });
	}

	return Permision

}