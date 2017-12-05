const _ = require('lodash');
const utils = require('../utils');
const { pipeline, pick, deserialize } = require('../utils');
const { User, Comment, Course, Section, Professor, sequelize: { QueryTypes }, mixin } = require('../../models');
mixin(_);
const { ServerError } = require('../middleware/error-handler');

exports.getRating = (options) => {
    let tasks = [
        () => {
            return _.query(`
                SELECT * FROM "best_commentrating"
            `, {
                type: QueryTypes.SELECT
            });
        },
        deserialize
    ];
    return pipeline(tasks, options);
};
