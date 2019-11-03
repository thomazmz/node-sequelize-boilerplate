const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./error/errorHandler');
const { sequelize } = require('../infrastructure/database');

class App {
	constructor() {
		this.database = sequelize;
		this.express = express();
		this.express.use(bodyParser.json());
		this.express.use('/authentication', require('./authentication/authenticationRoutes'));
		this.express.use('/authorization', require('./authorization/authorizationRoutes'));
		this.express.use(errorHandler);
	}

	listen(port, callback) {
		this.express.listen(port, () => {
			console.log(`Successfully listening on ${port}`);
			if(callback) callback();
		});
	}
	
	checkDatabaseConnection() {
		return this.database.authenticate()
		.then(() => console.log(`Successfully connected to ${this.database.config.database} database on port ${this.database.config.port}`))
		.catch(err => console.log(`Database connection has not been stablished: ${err}`));
	}
}

module.exports = new App();