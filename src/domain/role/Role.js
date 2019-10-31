const Sequelize = require("sequelize");

class Role extends Sequelize.Model {

	static init(sequelize, DataTypes) {
		return super.init({
			name: Sequelize.STRING
		}, { sequelize });
	}

	static associate(models) {
		this.belongsToMany(models.Permision, {
			as: 'permisions',
			through : 'PermisionByRole',
			foreignKey : 'roleId'
		});
	}

}

module.exports = Role;