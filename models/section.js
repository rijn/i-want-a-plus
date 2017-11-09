/* eslint-disable no-useless-escape */

'use strict';

const Promise = require('bluebird');
const _ = require('lodash');

let { dist, calculateSD } = require('./utils');
let grade = [ 4.0, 4.0, 3.67, 3.33, 3.0, 2.67, 2.33, 2.0, 1.67, 1.36, 1.0, 0.67, 0.00 ];

let updateParentCourseStatistic = (section, options) => {
    let _course;
    return section.getCourse().then(course => {
        _course = course;
        return course.getSections();
    }).then(sections => {
        return Promise.all(_.map(sections, section => section.getPastSection()));
    }).then(pastSections => {
        if (_.isEmpty(pastSections.length)) return;
        let totalStudentCount = _.sum(_.map(pastSections, 'totalStudentCount'));
        let totalGpa = _.sum(_.map(pastSections, pastSection => pastSection.averageGpa * pastSection.totalStudentCount));
        let averageGpa = totalStudentCount > 0 ? (totalGpa / totalStudentCount) : 0;
        let sd = calculateSD(_.reduce(pastSections, (collection, pastSection) => {
            _.each(dist, d => {
                collection[d] = (collection[d] || 0) + (pastSection[d] || 0);
            });
            return collection;
        }, { averageGpa }));

        return _course.update({ totalStudentCount, averageGpa, sd });
    });
};

module.exports = (sequelize, DataTypes) => {
    var Section = sequelize.define('Section', {
        year: {
            type: DataTypes.INTEGER,
            unique: 'uniqueSection'
        },
        term: {
            type: DataTypes.STRING,
            validate: {
                isIn: [ [ 'Fall', 'Spring', 'Summer' ] ]
            },
            unique: 'uniqueSection'
        },
        crn: {
            type: DataTypes.STRING(5),
            allowNull: false,
            unique: 'uniqueSection'
        },
        section: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true,
        getterMethods: {},
        setterMethods: {},
        hooks: {
            afterCreate: updateParentCourseStatistic,
            afterDestroy: updateParentCourseStatistic,
            afterUpdate: updateParentCourseStatistic
        }
    });

    Section.associate = models => {
        Section.belongsTo(models.Course);
        Section.belongsTo(models.CurrentSection, { constraint: false });
        Section.belongsTo(models.PastSection, { constraint: false });
        Section.belongsToMany(models.Professor, {
            through: {
                model: models.Teach,
                unique: false
            },
            foreignKey: 'SectionId'
        });
        Section.hasMany(models.Comment);
        Section.belongsToMany(models.User, {
            through: {
                model: models.Notify,
                unique: false
            },
            foreignKey: 'SectionId'
        });
    };

    return Section;
};
