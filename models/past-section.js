/* eslint-disable no-useless-escape */

'use strict';

const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
    var PastSection = sequelize.define('PastSection', {
        ap: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        a: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        am: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        bp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        b: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        bm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        c: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        cm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        dp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        d: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        dm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        f: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        w: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        averageGpa: {
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
        setterMethods: {},
        hooks: {
            beforeCreate: (pastSection, options) => {
                pastSection.averageGpa = require('./utils').calculateAvgGpa(pastSection);
                pastSection.totalStudentCount = require('./utils').calculateTotalStudent(pastSection);
            }
        }
    });

    PastSection.associate = models => {
        PastSection.hasOne(models.Section);
    };

    return PastSection;
};
