/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var Favorite = sequelize.define('Favorite', {
    }, {
        timestamps: false
    });

    Favorite.associate = models => {
        Favorite.belongsTo(models.User);

        Favorite.belongsTo(models.Professor, { constraint: false });
        Favorite.belongsTo(models.Course, { constraint: false });
        Favorite.belongsTo(models.Section, { constraint: false });
    };

    return Favorite;
};
