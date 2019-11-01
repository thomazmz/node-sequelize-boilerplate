const fs = require('fs');
const path = require('path');
const cls = require('cls-hooked');
const Sequelize = require('sequelize');
const config = require('./config');
const domain = '../../domain';

Sequelize.useCLS(cls.createNamespace('applicationNamespace'));
sequelize = new Sequelize(config[process.env.NODE_ENVIRONMENT])

const models = {};

const files = getFiles(domain);

files.forEach(file => {
	console.log(file);
	const File = require(file);
	const model = File.init(sequelize, Sequelize);
	models[model.name] = model;
});

function getFiles(relativePath) {

	const paths = getPaths(path.join(__dirname, relativePath));

	const files = paths.filter(path => {
		const file = require(path);
		return file.prototype instanceof Sequelize.Model;
	});

	return files;
}

function getPaths(globalPath, filePaths) {
	
	filePaths = filePaths || [];

	fs.readdirSync(globalPath).forEach(file => {

		const filePath = path.join(globalPath, file);

		if(fs.statSync(filePath).isDirectory()) {
			getPaths(filePath, filePaths);

		} else if(file.slice(-3) === '.js') {
			filePaths.push(filePath);
		}

	});

	return filePaths;
}

Object.values(models)
	.filter(model => typeof model.associate === "function")
	.forEach(model => model.associate(models));
  
module.exports = { ...models, sequelize };




// const config = require('./config');
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(config[process.env.NODE_ENVIRONMENT])


// const UserModel = require("../../domain/user/User");
// const AuthorizationModel = require("../../domain/authorization/Authorization");

// const models = {
//   User: UserModel.init(sequelize, Sequelize),
//   Authorization: AuthorizationModel.init(sequelize, Sequelize)
// };

// Object.values(models)
//   .filter(model => typeof model.associate === "function")
//   .forEach(model => model.associate(models));

// const db = {
//   ...models,
//   sequelize
// };

// module.exports = db;
