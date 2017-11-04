/* eslint-disable no-useless-escape */

'use strict';

const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
    var PastCourse = sequelize.define('PastCourse', {
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
        }
    }, {
        paranoid: true,
        getterMethods: {},
        setterMethods: {},
        hooks: {
            beforeCreate: (pastCourse, options) => {
                let dist = [ 'ap', 'a', 'am', 'bp', 'b', 'bm', 'cp', 'c', 'cm', 'dp', 'd', 'dm', 'f' ];
                let grade = [ 4.0, 4.0, 3.67, 3.33, 3.0, 2.67, 2.33, 2.0, 1.67, 1.36, 1.0, 0.67, 0.00 ];
                let value = _.map(dist, d => pastCourse.get(d));
                pastCourse.averageGpa = _.sum(_.zipWith(value, grade, (v, g) => v * g)) / _.sum(value);
            },
        }
    });

    PastCourse.associate = models => {
    };

    return PastCourse;
};
