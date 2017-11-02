/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var Comment = sequelize.define('Comment', {
        content: {
            type: DataTypes.STRING
        },
        // rating
    }, {
        paranoid: true,
        getterMethods: {},
        setterMethods: {}
    });

    Comment.associate = models => {
        Comment.belongsTo(models.User);
        Comment.belongsTo(models.Course);
    };

    return Comment;
};
