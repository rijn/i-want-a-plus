/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var Teach = sequelize.define('Teach', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        professor_id: {
            type: DataTypes.INTEGER,
            unique: 'teach'
        },
        course_id: {
            type: DataTypes.INTEGER,
            unique: 'teach'
        }
    }, {
        timestamps: false,
        underscored: true
    });

    return Teach;
};
