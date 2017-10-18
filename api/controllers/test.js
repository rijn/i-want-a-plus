var models = require('../models');
var pipeline = require('../utils/pipeline');

module.exports = (options) => {
    var tasks = [
        (options) => {
            return models.sequelize.query('SELECT VERSION();', { type: models.sequelize.QueryTypes.SELECT });
        }
    ];

    return pipeline(tasks, options);
};
