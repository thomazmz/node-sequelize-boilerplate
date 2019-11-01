const Sequelize = require("sequelize");

class Authorization extends Sequelize.Model {

	static init(sequelize, DataTypes) {
		return super.init({
			name: DataTypes.STRING
		}, 
		{ sequelize });
	}

	static associate(models) {
		this.belongsToMany(models.Authorization, {
			as: 'roles',
			through : 'AuthorizationByRole',
			foreignKey : 'roleId'
		});
	}
}

module.exports = Authorization;