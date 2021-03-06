/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var Teach = sequelize.define('Teach', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ProfessorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'teach'
        },
        SectionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'teach'
        }
    }, {
        timestamps: false
    });

    return Teach;
};
