const _ = require('lodash');
const utils = require('../utils');
const { pipeline, pick, deserialize } = utils;
const { User, Comment, sequelize } = require('../../models');
const { ServerError } = require('../middleware/error-handler');

exports.get = (options) => {
    // get comment / user / course through options.id
    let tasks = [
        // todo
    ];

    return pipeline(tasks, options);
}

exports.post = (object, options) => {
    let tasks = [
        (options) => {
            return Comment.create({
                content: object.content,
                UserId: options.mw.user.id
            }, { include: [{ model: User }] });
        },
        () => ({})
    ];

    return pipeline(tasks, options);
};

let checkUserAndComment = (CommentId, UserId) => {
    return sequelize.query(`SELECT COUNT(*) as quant
                            FROM Comments, Users
                            WHERE Comments.UserId = Users.id
                                and Comments.UserId = ${UserId}
                                and Comments.id = ${CommentId}`).then((result) => {
                                    console.log(result);
                                    //console.log(result[0][0].quant);
                                    if (result[0][0].quant == 0){
                                        console.log('BBBBB');
                                        throw ServerError({ message: "Not your comment", statusCode: 409 });
                                    }
                                    return true;
                                });
}

exports.update = (object, options) => {
    // update comment through id
    // object.content
    //let tasks = [
    //    (options) => {
    //        return checkUserAndComment(commentId, userId).then((result) => {
    //            if (result.count == 1) {
    //                return options;
    //            } else {
    //                throw ServerError({ message: "", statusCode: 409 });
    //            }
    //        })
    //    },
    //    (options) => {
    //        ....
    //    }
    //];

    console.log(object, options, options.mw.user.id);

    console.log("AAAAA");

    console.log(checkUserAndComment(options.id, options.mw.user.id));



    return pipeline(tasks, options);
};

exports.delete = (options) => {
    // delete comment through id
    let tasks = [
        // todo
    ];

    return pipeline(tasks, options);
};

exports.getAllMyComments = (options) => {
    let tasks = [
        (options) => {
            console.log(options);
            return options.mw.user.getComments();
        }
    ];

    return pipeline(tasks, options);
}

exports.getCommentsOfCourse = (options) => {
    let tasks = [
        (options) => {
            return sequelize.query(`SELECT
                    Comments.id, Comments.content, Comments.createdAt, Comments.updatedAt,
                    Users.id as user_id, Users.email as user_email,
                    Courses.
                FROM Users, Courses, Comments
                WHERE Users.id = Comments.UserId
                    AND Courses.id = Comments.CourseId
                    AND Courses.id = ${options.id}`);
        },
        data => _.get(data, '0.0'),
        deserialize
    ];

    return pipeline(tasks, options);
}
