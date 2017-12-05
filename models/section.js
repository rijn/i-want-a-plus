/* eslint-disable no-useless-escape */

'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const Sequelize = require('sequelize');

let { pastSectionReducer } = require('./utils');

let updateParentCourseStatistic = (section, options) => {
    let _course;
    return section.getCourse().then(course => {
        _course = course;
        return course.getSections();
    }).then(sections => {
        return Promise.all(_.map(sections, section => section.getPastSection()));
    }).then(pastSections => {
        return _course.update(_.pick(pastSectionReducer(pastSections), [ 'totalStudentCount', 'averageGpa', 'sd' ]));
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
        },
        CurrentSectionId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'CurrentSections',
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
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
        Section.belongsTo(models.CurrentSection, { constraints: false });
        Section.belongsTo(models.PastSection, { constraints: false });
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
