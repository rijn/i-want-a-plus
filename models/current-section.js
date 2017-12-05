/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var CurrentSection = sequelize.define('CurrentSection', {
        availability: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        day: {
            type: DataTypes.STRING
        },
        time: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true,
        getterMethods: {},
        setterMethods: {}
    });

    CurrentSection.associate = models => {
        CurrentSection.belongsToMany(models.User, {
            through: {
                model: models.Notify,
                unique: false
            },
            foreignKey: 'CurrentSectionId'
        });
    };

    return CurrentSection;
};
