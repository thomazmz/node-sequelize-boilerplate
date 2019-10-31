const fs = require('fs');
const path = require('path');
const cls = require('cls-hooked');
const Sequelize = require('sequelize');
const config = require('./config');

const domain = "../../domain"
Sequelize.useCLS(cls.createNamespace('applicationNamespace'));
sequelize = new Sequelize(config[process.env.NODE_ENVIRONMENT])
models = []

const filePaths = getFilePaths(domain);

filePaths.forEach(filePath => {
	const Model = require(filePath);
	if(isModel(Model)) {
		const model = Model.init(sequelize, Sequelize);
		models[model.name] = model;
	}
});

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

function getFilePaths(targetPath, filePaths) {
	
	filePaths = filePaths || [];
	const nodes = fs.readdirSync(path.join(__dirname, targetPath));
	
	nodes.forEach(node => {
		const nodePath = path.join(__dirname, targetPath + "/" + node);

		if(fs.statSync(nodePath).isDirectory()) {
			getFilePaths(path.join(targetPath, node), filePaths);
		} else if(node.slice(-3) === '.js') {
			filePaths.push(path.join(targetPath, node));
		}
	});
	return filePaths;
}

function isModel(fileContent) {
	return (fileContent.prototype instanceof Sequelize.Model);
}

module.exports = { Sequelize, sequelize, ...models };

