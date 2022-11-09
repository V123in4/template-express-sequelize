const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configFileObj = require('../config');

const env = process.env.NODE_ENV || 'local';
const selectedConfig = configFileObj[env];
const db = {};

const sequelize = new Sequelize(
  selectedConfig.database,
  selectedConfig.username,
  selectedConfig.password,
  selectedConfig
);

const files = fs.readdirSync(__dirname);
const modelFiles = files.filter(file => {
  return (
    file.indexOf('.') !== 0)
    && (file !== path.basename(__filename))
    && (file.slice(-3) === '.js'
  );
});

modelFiles.forEach(file => {
  const fullPath = path.join(__dirname, file)
  const model = require(fullPath);
  const finalModel = model(sequelize, Sequelize.DataTypes);
  // inject module to `db` object
  db[finalModel.name] = finalModel;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
