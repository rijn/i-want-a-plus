/* eslint-disable no-useless-escape */

'use strict';

const Hashids = require('hashids');
const encoderDecoder = new Hashids('user', 16);

module.exports = (sequelize, DataTypes) => {
    var Permission = sequelize.define('Permission', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true,
        getterMethods: {},
        setterMethods: {}
    });

    Permission.associate = models => {
        Permission.belongsTo(models.Group);
    };

    return Permission;
};
