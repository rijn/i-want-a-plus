const _ = require('lodash');
const utils = require('../utils');
const { pipeline, pick, deserialize } = require('../utils');
const { User, Comment, Course, Section, Professor, sequelize: { QueryTypes }, mixin } = require('../../models');
mixin(_);
const { ServerError } = require('../middleware/error-handler');

exports.getAllCourses = (options) => {
    let tasks = [
        (options) => {
            return _.query(`
                SELECT CourseId
                From Notifies
                WHERE UserId = ${options.mw.user.id}
            `, {
                type: QueryTypes.SELECT
            });
        },
        (result) => {
        }
    ];

    return pipeline(tasks, options);
};

exports.delete = (options) => {
    let tasks = [
        (options) => {
            return _.query(`
                SELECT UserId, id
                FROM Notifies
                WHERE Notifies.id = ${options.id}
            `, {
                type: QueryTypes.SELECT
            });
        },
        (result) => {
            // Same User
            if (result[0][0].UserId == options.mw.user.id){
                return result[0][0].id;
            }
            else{
                throw ServerError({ message: "Not your notification", statusCode: 400 });
            }
        },
        (options) => {
            return _.query(`
                DELETE FROM CourseId
                WHERE CourseId.id = ${options}
            `, {
                type: QueryTypes.DELETE
            });
        },
        (result) => {
            return "DELETE Success";
        }
    ];

    return pipeline(tasks, options);
};

exports.post = (object, options) => {
    let tasks = [
        (options) => {
            return _.query(`
            `, {
                type: QueryTypes.INSERT
            });
        }
    ];

    return pipeline(tasks, options);
};
