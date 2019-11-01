const Sequelize = require("sequelize");

class User extends Sequelize.Model {

	static init(sequelize, DataTypes) {
		return super.init({	
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.VIRTUAL,
			passwordHash: DataTypes.STRING
		}, 
		{ sequelize });
	}

	static associate(models) {
		this.belongsTo(models.Role, {
			as: 'role',
			foreignKey : 'roleId'
		}); 
	}
	
	getBarearToken(secret = 'secret', payload) {
		payload = payload || { id : this.id };
		return jwt.sign(payload, secret);
	}

	verifyToken(token, secret = 'secret') {
		return new Promise((resolve, reject) => {
			jwt.verify(token, secret, (err, decodedToken) => {
				if(err) {
					reject(err);
				} else {
					resolve(decodedToken);
				}
			});
		});
	}

	verifyPassword(plainPassword) {
		return new Promise((resolve) => {
			bcrypt.compare(plainPassword, this.passwordHash)
			.then(result => !result ? resolve(null) : resolve(this));
		});
	}

	hashPassword() {
		return new Promise((resolve) => {
			if(this.password) {
				bcrypt.hash(this.password, 10)
				.then((hash) => {
					this.passwordHash = hash;
					this.password = null;
					resolve(this);
				});
			} else {
				// Fixme : This might not be correct
				resolve(this);
			}
		});
	}

}

module.exports = User;