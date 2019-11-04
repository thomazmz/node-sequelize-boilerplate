const fs = require('fs');
const path = require('path');
const cls = require('cls-hooked');
const Sequelize = require('sequelize');
const config = require('./config');
const domain = '../../domain';

Sequelize.useCLS(cls.createNamespace('applicationNamespace'));
sequelize = new Sequelize(config[process.env.NODE_ENVIRONMENT]);

models = {
	Authorization: require('../../domain/authorization/Authorization'),
	Role: require('../../domain/role/Role.js'),
	User: require('../../domain/user/User.js')
}

Object.keys(models)
	.map(key => models[key] = models[key].init(sequelize, Sequelize));

Object.values(models)
	.filter(model => typeof model.associate === "function")
	.forEach(model => model.associate(models));

module.exports = { ...models, sequelize };







// const models = getModels(domain);

// function getModels(relativePath) {

// 	const models = {};
// 	const notModels = [];
// 	const filePaths = getPaths(path.join(__dirname, relativePath));

// 	filePaths.forEach(filePath => {
// 		const file = require(filePath);
// 		if(!(file.prototype instanceof Sequelize.Model)) {
// 			notModels.push(filePath);
// 		} else {
// 			const model = file.init(sequelize, Sequelize);
// 			models[model.name] = model;
// 		}
// 	});

// 	notModels.forEach(filePath => {
// 		delete require.cache[require.resolve(filePath)];
// 	});

// 	return models;
// }

// function getPaths(globalPath, filePaths) {
	
// 	filePaths = filePaths || [];

// 	fs.readdirSync(globalPath).forEach(file => {
// 		const filePath = path.join(globalPath, file);
// 		if(fs.statSync(filePath).isDirectory()) {
// 			getPaths(filePath, filePaths);
// 		} else if(file.slice(-3) === '.js') {
// 			filePaths.push(filePath);
// 		}
// 	});

// 	return filePaths;
// }

// Test
