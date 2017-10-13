const Q = require('q');
const errorHandler = require('../utils/error-handler');
const sequelize = require('../models').sequelize;

module.exports = (req, res) => {
    return Q()
        .then(() => {
            return sequelize.query('SELECT VERSION();', { type: sequelize.QueryTypes.SELECT });
        })
        .done(version => {
            res.status(201).send(version);
        }, errorHandler(res));
};
