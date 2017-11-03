const models = require('../../models');
const errorHandler = require('../middleware/error-handler');
const Promise = require('bluebird');
const random = require('../utils/random');
const _ = require('lodash');

module.exports = {
    model: models.Accesstoken,
    create: (options) => {
        let { user: { id } } = options;
        let token = random(64);
        return models.Accesstoken.create({ token, UserId: id }, {
            include: [{ model: models.User }]
        });
    }
};
