const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./error/errorHandler');

class App {
	constructor() {
		this.express = express();
		this.express.use(bodyParser.json());
		this.express.use('/users', require('./user/userRoutes'));
		this.express.use(errorHandler);
	}

	listen(port, callback) {
		this.express.listen(port, () => {
			console.log(`Successfully listening on ${port}`);
			if(callback) callback();
		});
	}
}

module.exports = new App();