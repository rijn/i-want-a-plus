/* eslint-disable no-useless-escape */

'use strict';

const Hashids = require('hashids');
const encoderDecoder = new Hashids('user', 16);

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                is: ['^([0-9a-zA-Z_\\\-/+!@#$%^&*]){6,255}$', 'gi']
            }
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authority: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        paranoid: true,
        getterMethods: {
            _id () { return encoderDecoder.encode(this.id); }
        },
        setterMethods: {}
    });

    User.associate = models => {
        User.hasMany(models.Accesstoken);
        User.hasMany(models.Comment);
        User.belongsTo(models.Group);
        User.belongsToMany(models.Course, {
            through: {
                model: models.Notify,
                unique: false
            },
            foreignKey: 'user_id'
        });
    };

    return User;
};
