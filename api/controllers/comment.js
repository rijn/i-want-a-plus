const utils = require('../utils');
const { pipeline, pick } = utils;
const { User, Comment } = require('../../models');

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

exports.update = (object, options) => {
    // update comment through id
    // object.content
    let tasks = [
        // todo
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
