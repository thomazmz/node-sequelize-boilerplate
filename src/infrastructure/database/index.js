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
	const File = require(file);
	const model = File.init(sequelize, Sequelize);
	models[model.name] = model;
});

function getFiles(relativePath) {
	const paths = getPaths(path.join(__dirname, relativePath));
	return paths.filter(filePath => {
		const file = require(filePath);
		if(file.prototype instanceof Sequelize.Model) return true;
		else delete require.cache[filePath];
	});
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