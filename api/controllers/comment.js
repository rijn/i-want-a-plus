const utils = require('../utils');
const { pipeline, pick } = utils;
const { User, Comment } = require('../../models');
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
    return sequelize.query(`...`);
}

exports.update = (object, options) => {
    // update comment through id
    // object.content
    let tasks = [
        (options) => {
            return checkUserAndComment(commentId, userId).then((result) => {
                if (result.count == 1) {
                    return options;
                } else {
                    throw ServerError({ message: "", statusCode: 409 });
                }
            })
        },
        (options) => {
            ....
        }
    ];

    console.log(object, options, options.mw.user.id);

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
