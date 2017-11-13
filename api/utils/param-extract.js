const _ = require('lodash');

module.exports = (options) => {
    return function (res, req, next) {
        res.params = _.mapKeys(res.params, (v, k) => _.get(options, k) || k);
        next();
    };
};
