const Q = require('q');
const errorHandler = require('../utils/error-handler');
const sequelize = require('../models').sequelize;

module.exports = (req, res) => {
    return Q()
        .then(() => {
            return sequelize.query('SELECT `SID` FROM `Students`;', { type: sequelize.QueryTypes.SELECT });
        })
        .done(sids => {
            res.status(201).send(sids);
        }, errorHandler(res));
};
