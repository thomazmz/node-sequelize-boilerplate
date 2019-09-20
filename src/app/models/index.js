const fs = require('fs');
const path = require('path'); 
const Sequelize = require('sequelize');
const config = require('../../config/database.js');

const models = {
  Sequelize : Sequelize,
  sequelize : new Sequelize(config)
}

fs.readdirSync(__dirname)
.filter(file => isModel(file))
.forEach((file) => loadModel(file));

function isModel(file) {
  return (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js');
}

function loadModel(file) {
  const model = models.sequelize.import(path.join(__dirname, file));
  models[model.name] = model;
}

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    model[modelName].associate(database);
  }
});

module.exports = models;