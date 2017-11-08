/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var Professor = sequelize.define('Professor', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true,
        getterMethods: {},
        setterMethods: {}
    });

    Professor.associate = models => {
        Professor.belongsTo(models.School);
        Professor.belongsToMany(models.Section, {
            through: {
                model: models.Teach,
                unique: false
            },
            foreignKey: 'ProfessorId'
        });
    };

    return Professor;
};
