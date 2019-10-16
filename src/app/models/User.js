const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Op = require('sequelize').Op;

module.exports = (sequelize, Sequelize) => {

	const User = sequelize.define('User', {
		username: Sequelize.STRING,
		email: Sequelize.STRING,
		password: Sequelize.VIRTUAL,
		passwordHash: Sequelize.STRING
	});

	User.associate = function(models) {
		User.hasMany(models.Task, {as: 'tasks'});
	};
	
	User.findOneById = function(id) {
		return User.findOne({
			where: { id }
		});
	}
	
	User.findOneByEmail = function(email) {
		return User.findOne({ 
			where: { email } 
		});
	}

	User.findOneByStringIdentifier = function(stringIdentifier) {
		return User.findOne({
			where: { [Op.or] : { username: stringIdentifier, email: stringIdentifier } }
		});
	}

	User.verifyCredentials = function(stringIdentifier, plainPassword) {
		return new Promise((resolve) => {
			User.findOneByStringIdentifier(stringIdentifier)
			.then(user => !user ? resolve(null) : user.verifyPassword(plainPassword))
			.then(result => result ? resolve(result) : resolve(null));
		});	
	}

	User.verifyToken = function(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, 'secret', (err, decodedToken) => {
				if(err) {
					reject(err);
				} else {
					User.findOneById(decodedToken.userId)
					.then(user => user ? resolve(user) : resolve(null))
				}
			});
		});
	}

	User.prototype.verifyPassword = function(plainPassword) {
		return new Promise((resolve) => {
			bcrypt.compare(plainPassword, this.passwordHash)
			.then(result => !result ? resolve(null) : resolve(this));
		});
	}

	User.prototype.hashPassword = function() {
		return new Promise((resolve) => {
			if(this.password) {
				bcrypt.hash(this.password, 10)
				.then((hash) => {
					this.passwordHash = hash;
					this.password = null;
					resolve(this);
				});
			} else {
				resolve(this);
			}
		});
	}

	User.prototype.getBarearToken = function() {
		return 'Barear ' + jwt.sign({ userId : this.id }, "secret");
	}

	return User;

}