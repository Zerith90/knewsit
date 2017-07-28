'use strict'
let Sequelize = require('sequelize');
let config 			= require("../config");
let fs =require('fs');
let path      = require('path');
let basename  = path.basename(module.filename);
let db = {}

let models_dir=  path.join(__dirname, '..', 'models')
var sequelize = config.sequelize.dag
fs
.readdirSync(models_dir)
.filter(function(file) {
	return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(function(file) {
	var model = sequelize['import'](path.join(models_dir, file));
	db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
// console.log(db);
