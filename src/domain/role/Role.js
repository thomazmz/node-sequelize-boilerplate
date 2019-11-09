const Sequelize = require("sequelize");

class Role extends Sequelize.Model {

	static init(sequelize, DataTypes) {
		return super.init({
			name: DataTypes.STRING
		}, 
		{ sequelize });
	}

	static associate(models) {
		this.belongsToMany(models.Authority, {
			as: 'authorities',
			through : 'AuthorityByRole',
			foreignKey : 'roleId'
		});
	}
}

module.exports = Role;