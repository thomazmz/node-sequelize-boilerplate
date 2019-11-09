const Sequelize = require('sequelize');
const Authorities = require('./Authorities');

class Authority extends Sequelize.Model {

	static init(sequelize, DataTypes) {
		return super.init({
			name: DataTypes.STRING
		}, 
		{ sequelize });
	}

	static associate(models) {
		this.belongsToMany(models.Authority, {
			as: 'roles',
			through : 'AuthorityByRole',
			foreignKey : 'roleId'
		});
	}

	static get to() { 
		return Authorities;
	}
}

module.exports = Authority;