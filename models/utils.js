const _ = require('lodash');
const fp = require('lodash/fp');

let dist = [ 'ap', 'a', 'am', 'bp', 'b', 'bm', 'cp', 'c', 'cm', 'dp', 'd', 'dm', 'f' ];
exports.dist = dist;
let grade = [ 4.0, 4.0, 3.67, 3.33, 3.0, 2.67, 2.33, 2.0, 1.67, 1.36, 1.0, 0.67, 0.00 ];
exports.grade = grade;
let gradeText = [ 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F' ];
exports.gradeText = gradeText;

exports.mapObjectOrArray = instance => _.map(dist, d => _.get(instance, d));

exports.calculateAvgGpa = instance => {
    let value = _.map(dist, d => _.get(instance, d));
    return _.sum(_.zipWith(value, grade, (v, g) => v * g)) / _.sum(_.map(value, _.toInteger));
};

exports.calculateTotalStudent = instance => {
    let value = _.map(dist, d => _.get(instance, d));
    return _.sum(_.map(value, _.toInteger));
};

exports.calculateSD = calculateSD = instance => {
    let value = _.map(dist, d => _.get(instance, d) || 0);
    let meanGPA = instance.averageGpa;

    return Math.sqrt(_.sum(_.map(_.zip(grade, value), n => (n[0] - meanGPA) * (n[0] - meanGPA) * n[1])) / _.sum(value));
};

exports.pastSectionReducer = pastSectionReducer = pastSections => {
    let defaultValue = _.reduce(pastSections, (collection, pastSection) => {
        _.each(dist, d => {
            if (!_.isNumber(pastSection[d])) return;
            collection[d] = (collection[d] || 0) + (pastSection[d] || 0);
        });
        return collection;
    }, { totalStudentCount: 0, averageGpa: 0, sd: 0 });
    if (_.isEmpty(pastSections)) return defaultValue;
    defaultValue.totalStudentCount = _.sum(_.map(pastSections, 'totalStudentCount'));
    let totalGpa = _.sum(_.map(pastSections, pastSection => pastSection.totalStudentCount > 0 ? pastSection.averageGpa * pastSection.totalStudentCount : 0));
    defaultValue.averageGpa = defaultValue.totalStudentCount > 0 ? (totalGpa / defaultValue.totalStudentCount) : 0;
    defaultValue.sd = defaultValue.averageGpa > 0 ? calculateSD(defaultValue) : 0;

    return defaultValue;
};

exports.SectionReducer = Sections => {
    return pastSectionReducer(Sections.map(({ PastSection }) => PastSection));
};
