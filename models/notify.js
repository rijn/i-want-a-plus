/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var Notify = sequelize.define('Notify', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            unique: 'notify'
        },
        course_id: {
            type: DataTypes.INTEGER,
            unique: 'notify'
        }
    }, {
        timestamps: false,
        underscored: true
    });

    return Notify;
};
