/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var CurrentSection = sequelize.define('CurrentSection', {
        year: {
            type: DataTypes.STRING,
            unique: 'sectionUnique'
        },
        term: {
            type: DataTypes.STRING,
            unique: 'sectionUnique'
        },

        crn: {
            type: DataTypes.STRING,
            unique: 'sectionUnique'
        },
        subject: {
            type: DataTypes.STRING,
            unique: 'sectionUnique'
        },
        course: {
            type: DataTypes.STRING,
            unique: 'sectionUnique'
        },
        section: {
            type: DataTypes.STRING,
            unique: false
        },
        status: {
            type: DataTypes.INTEGER,
            unique: false
        },
        day: {
            type: DataTypes.STRING,
            unique: false
        },
        time: {
            type: DataTypes.STRING,
            unique: false
        },
        instructor: {
            type: DataTypes.STRING,
            unique: false
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
          foreignKey: 'SectionId'
      });
    };

    return CurrentSection;
};
