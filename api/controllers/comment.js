const utils = require('../utils');
const { pipeline, pick } = utils;
const { User, Comment } = require('../../models');

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
}

exports.getAllMyComments = (options) => {
    let tasks = [
        (options) => {
            console.log(options);
            return options.mw.user.getComments();
        }
    ];

    return pipeline(tasks, options);
}
