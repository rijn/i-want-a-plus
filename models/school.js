/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var School = sequelize.define('School', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true,
        getterMethods: {},
        setterMethods: {}
    });

    return School;
};
