const _ = require('lodash');
const utils = require('../utils');
const { pipeline, pick, deserialize } = utils;
const { User, Comment, sequelize } = require('../../models');
const { ServerError } = require('../middleware/error-handler');

exports.getAllCourses = (options) => {
    let tasks = [
        (options) => {
            return sequelize.query(`SELECT CourseId
                                    From Notifies
                                    WHERE UserId = ${options.mw.user.id}`).then(
                (result) => {
                    return result[0][0];
                });
        }];

    return pipeline(tasks, options);
}

exports.delete = (options) => {
    let tasks = [
        (options) => {
            return sequelize.query(`SELECT UserId, id
                                    FROM Notifies
                                    WHERE Notifies.id = ${options.id}`);
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
            return sequelize.query(`DELETE FROM CourseId
                                    WHERE CourseId.id = ${options}`).then(
                                        (result) => {
                                            return "DELETE Success";
                                        })
        }];

    return pipeline(tasks, options);
}

exports.post = (object, options) => {
    let tasks = [
        (options) => {
            return sequelize.query(
                ``);
        }];

    return pipeline(tasks, options);
}







