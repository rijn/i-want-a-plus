/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var Course = sequelize.define('Course', {
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'uniqueCourse'
        },
        course: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'uniqueCourse'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        averageGpa: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        sd: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        totalStudentCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        paranoid: true,
        getterMethods: {},
        setterMethods: {}
    });

    Course.associate = models => {
        Course.belongsTo(models.School);
        Course.hasMany(models.Section);
        Course.hasMany(models.Comment);
    }

    return Course;
};
