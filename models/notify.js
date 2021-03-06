/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var Notify = sequelize.define('Notify', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UserId: {
            type: DataTypes.INTEGER,
            unique: 'notify'
        },
        CurrentSectionId: {
            type: DataTypes.INTEGER,
            unique: 'notify'
        }
    }, {
        timestamps: false,
    });

    return Notify;
};
