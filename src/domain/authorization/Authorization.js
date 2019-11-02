const Sequelize = require('sequelize');
const Authorizations = require('./Authorizations');

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

	static get to() { 
		return Authorizations;
	}
}

module.exports = Authorization;