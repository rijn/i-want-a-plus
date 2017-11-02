/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var CurrentCourse = sequelize.define('CurrentCourse', {
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

    CurrentCourse.associate = models => {
        CurrentCourse.belongsTo(models.Course);
    };

    return CurrentCourse;
};
