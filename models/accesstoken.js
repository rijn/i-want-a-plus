/* eslint-disable no-useless-escape */

'use strict';

const Hashids = require('hashids');
const encoderDecoder = new Hashids('user', 16);

module.exports = (sequelize, DataTypes) => {
    var Accesstoken = sequelize.define('Accesstoken', {
        token: {
            type: DataTypes.STRING,
        }
    }, {});

    Accesstoken.associate = models => {
        Accesstoken.belongsTo(models.User);
    };

    return Accesstoken;
};
