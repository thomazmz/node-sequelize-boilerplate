const Sequelize = require("sequelize");

class Role extends Sequelize.Model {

	static init(sequelize, DataTypes) {
		return super.init({
			name: DataTypes.STRING
		}, 
		{ sequelize });
	}

	static associate(models) {
		this.belongsToMany(models.Authorization, {
			as: 'authorizations',
			through : 'AuthorizationsByRole',
			foreignKey : 'roleId'
		});
	}
}

module.exports = Role;