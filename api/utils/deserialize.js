const _ = require('lodash');

module.exports = (options) => {
    return _.reduce(
        options,
        (result, value, key) => _.setWith(result, key.replace('_', '.'), value),
        {}
    );
};
