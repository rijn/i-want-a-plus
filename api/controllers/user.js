const utils = require('../utils');
const { pipeline, pick } = utils;
const User = require('../models').User;

exports.signup = (options) => {
    let tasks = [
        // TODO: schema check
        // TODO: data pickup
        User.isEmailAlreadyExist,
        User.create,
        pick([ '_id' ])
    ];

    return pipeline(tasks, options);
}
