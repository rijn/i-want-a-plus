var models = require('../../models');
var pipeline = require('../utils/pipeline');

module.exports = (options) => {
    var tasks = [
        (options) => {
            return models.sequelize.query('SELECT 1+1=2;', { type: models.sequelize.QueryTypes.SELECT });
        }
    ];

    return pipeline(tasks, options);
};
