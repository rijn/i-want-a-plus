const _ = require('lodash');

exports.calculateAvgGpa = instance => {
    let dist = [ 'ap', 'a', 'am', 'bp', 'b', 'bm', 'cp', 'c', 'cm', 'dp', 'd', 'dm', 'f' ];
    let grade = [ 4.0, 4.0, 3.67, 3.33, 3.0, 2.67, 2.33, 2.0, 1.67, 1.36, 1.0, 0.67, 0.00 ];
    let value = _.map(dist, d => _.get(instance, d));
    return _.sum(_.zipWith(value, grade, (v, g) => v * g)) / _.sum(_.map(value, _.toInteger));
}
