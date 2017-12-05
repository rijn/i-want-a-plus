/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var Favorite = sequelize.define('Favorite', {
    }, {
        timestamps: false
    });

    Favorite.associate = models => {
        Favorite.belongsTo(models.User);

        Favorite.belongsTo(models.Professor, { constraints: false });
        Favorite.belongsTo(models.Course, { constraints: false });
        Favorite.belongsTo(models.Section, { constraints: false });
    };

    return Favorite;
};
