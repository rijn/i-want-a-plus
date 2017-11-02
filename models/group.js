/* eslint-disable no-useless-escape */

'use strict';

const Hashids = require('hashids');
const encoderDecoder = new Hashids('user', 16);

module.exports = (sequelize, DataTypes) => {
    var Group = sequelize.define('Group', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true,
        getterMethods: {},
        setterMethods: {}
    });

    Group.associate = models => {
        Group.hasMany(models.Permission);
        Group.hasMany(models.User);
    };

    return Group;
};
