const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

	User.findOneByUsername = function(username) {
		return User.findOne({
			where : { username }
		})
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

	User.prototype.getBarearToken = function(secret = 'secret', payload) {
		payload = payload || { id : this.id };
		return jwt.sign(payload, secret);
	}

	User.verifyToken = function(token, secret = 'secret') {
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

	return User;

}