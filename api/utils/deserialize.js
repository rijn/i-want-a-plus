const _ = require('lodash');
const fp = require('lodash/fp');

const reducer = _.partial(_.reduce, _,
    (result, value, key) => _.setWith(result, key.replace('_', '.'), value),
    {}
);

module.exports = (options) => {
    if (!_.isArray(options)) {
        options = [options];
    }
    return _.map(options, reducer);
};
