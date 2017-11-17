'use strict';

const fs = require('fs');
const _ = require('lodash');
const fp = require('lodash/fp');
const path = require('path');
const Sequelize = require('sequelize');
const db = {};
const config = require('../config').db;
db.config = config;
if (process.env.NODE_ENV === 'dev') {
    console.log(`Connecting [${config.database}]:[${config.host}] via [${config.dialect}] with [${config.username}]`);
}
const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'utils.js');
    })
    .forEach(file => {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

Object.keys(db).forEach(modelName => {
    if ('hookFn' in db[modelName]) {
        db[modelName].hookFn(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.utils = require('./utils');

db.mixin = (__) => {
    let sequelize = require('.').sequelize;
    __.mixin(_.flow([
        fp.pick([ 'query', 'escape' ]),
        fp.mapValues(_.partial(_.bind, _, sequelize))
    ])(sequelize));
}

module.exports = db;
