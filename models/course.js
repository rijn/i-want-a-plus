/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var Course = sequelize.define('Course', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        crn: {
            type: DataTypes.STRING(5),
            allowNull: false,
            validate: {
                is: ['^\d{5}$', 'i']
            }
        },
        term: {
            type: DataTypes.STRING
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
