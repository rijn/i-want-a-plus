const _ = require('lodash');

let dist = [ 'ap', 'a', 'am', 'bp', 'b', 'bm', 'cp', 'c', 'cm', 'dp', 'd', 'dm', 'f' ];
exports.dist = dist;
let grade = [ 4.0, 4.0, 3.67, 3.33, 3.0, 2.67, 2.33, 2.0, 1.67, 1.36, 1.0, 0.67, 0.00 ];

exports.calculateAvgGpa = instance => {
    let value = _.map(dist, d => _.get(instance, d));
    return _.sum(_.zipWith(value, grade, (v, g) => v * g)) / _.sum(_.map(value, _.toInteger));
}

exports.calculateTotalStudent = instance => {
    let value = _.map(dist, d => _.get(instance, d));
    return _.sum(_.map(value, _.toInteger));
}

exports.calculateSD = instance => {
    let value = _.map(dist, d => _.get(instance, d));
    let meanGPA = instance.averageGpa;

    return Math.sqrt(_.sum(_.map(_.zip(grade, value), n => (n[0] - meanGPA) * (n[0] - meanGPA) * n[1])) / _.sum(value));
}
