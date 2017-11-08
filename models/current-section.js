/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var CurrentSection = sequelize.define('CurrentSection', {
        availableSlot: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        paranoid: true,
        getterMethods: {},
        setterMethods: {}
    });

    CurrentSection.associate = models => {
    };

    return CurrentSection;
};
