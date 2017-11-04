/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var Course = sequelize.define('Course', {
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        course: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        crn: {
            type: DataTypes.STRING(5),
            allowNull: false,
            // validate: {
            //     is: ['^\d{5}$', 'i']
            // },
            unique: 'uniqueCourse'
        },
        term: {
            type: DataTypes.STRING,
            validate: {
                isIn: [ [ 'Fall', 'Spring', 'Summer' ] ]
            },
            unique: 'uniqueCourse'
        },
        year: {
            type: DataTypes.INTEGER,
            unique: 'uniqueCourse'
        },
        section: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true,
        getterMethods: {},
        setterMethods: {}
    });

    Course.associate = models => {
        Course.belongsTo(models.CurrentCourse, { constraint: false });
        Course.belongsTo(models.PastCourse, { constraint: false });
        Course.belongsTo(models.School);
        Course.belongsToMany(models.Professor, {
            through: {
                model: models.Teach,
                unique: false
            },
            foreignKey: 'course_id'
        });
        Course.hasMany(models.Comment);
        Course.belongsToMany(models.User, {
            through: {
                model: models.Notify,
                unique: false
            },
            foreignKey: 'course_id'
        });
    }



    return Course;
};
