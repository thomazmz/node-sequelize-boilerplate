const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {

	const User = sequelize.define('User', {
		name: Sequelize.STRING,
		email: Sequelize.STRING,
		password: Sequelize.STRING
	}, {
		tableName: 'user'
	});
	
	User.findOneById = function(id) {
			return User.findOne({
					where: { id }
			});
	}
	
	User.verifyCredentials = function(user, plainPassword) {
			return new Promise((resolve) => {
					bcrypt.compare(plainPassword, user.password)
					.then(result => !result ? resolve(false) : resolve(true));
			});
	}

	User.prototype.hashPassword = function() {
		return new Promise((resolve) => {
			bcrypt.hash(this.password, 10)
			.then((hash) => {
				this.password = hash
				resolve(this);
			});
		});
	}

	// User.prototype.getBarearToken = function() {
	//     return jwt.sign({ email : this.email, username: this.username }, "secret");
	// }

	return User;

}