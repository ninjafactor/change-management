'use strict';

/**
 * Model names should follow the standard documented here: 
 *  https://google.github.io/styleguide/jsoncstyleguide.xml
 *  Basically camelCase
 * 
 * Table and field names should follow the standard followed here:
 *  https://dev.mysql.com/doc/internals/en/coding-style.html
 *  Basically snake_case: lower_case_with_underscores
 */

require('rootpath')();
const fs = require('fs');
const sequelize = require('sequelize');
const sqlSettings = require('config/settings')().sequelize;

/**
 * Fetch settings from conf
 */
const client = new sequelize(
    sqlSettings.options.database,
    sqlSettings.options.username,
    sqlSettings.options.password,
    sqlSettings.options
);

const db = {};

/**
 * Find all model files
 */
fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        let model = client.import(file);
        db[model.name] = model;
    });

/**
 * Create a db instance of all models
 */
Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = client;
db.Sequelize = sequelize;

module.exports = db;