const _ = require('lodash');

module.exports = function (field) {
    return function (options) {
        return _.pick(options, field);
    };
};
