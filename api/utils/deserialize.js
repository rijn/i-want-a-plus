const _ = require('lodash');
const fp = require('lodash/fp');

const reducer = object => _.reduce(
    object,
    (result, value, key) => _.setWith(result, key.replace(/\_/g, '.'), value),
    {}
);

const reduceNull = object => {
    if (!_.isObjectLike(object) || _.isDate(object)) {
        return object;
    } else {
        if (_.every(_.map(_.values(object), _.isNull))) {
            return null;
        } else {
            return _.mapValues(object, reduceNull);
        }
    }
};

module.exports = (options) => {
    if (!_.isArray(options)) {
        options = [options];
    }
    return _.map(options, _.flow([ reducer, reduceNull ]));
};
