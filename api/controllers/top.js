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
                BEGIN;
                SELECT * FROM "best_commentrating";
                COMMIT;
                BEGIN;
                SELECT * FROM "Favorites";
                COMMIT;
            `);
        }
    ];
    return pipeline(tasks, options);
};
