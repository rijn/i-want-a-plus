/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var Comment = sequelize.define('Comment', {
        content: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false,
            validate: {
                isFloat: true,
                max: 5,
                min: 0
            }
        }
    }, {
        paranoid: true,
        getterMethods: {},
        setterMethods: {}
    });

    Comment.associate = models => {
        Comment.belongsTo(models.User);
        Comment.belongsTo(models.Course, { constraint: false });
        Comment.belongsTo(models.Section, { constraint: false });
        Comment.belongsTo(models.Professor, { constraint: false });
    };

    return Comment;
};
