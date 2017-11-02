const utils = require('../utils');
const { pipeline, pick } = utils;
const { Accesstoken, User } = require('../models');

exports.signup = (options) => {
    let tasks = [
        // TODO: schema check
        // TODO: data pickup
        pick([ 'email', 'password' ]),
        User.throwIfEmailAlreadyExist,
        User.create,
        pick([ '_id' ])
    ];

    return pipeline(tasks, options);
}

exports.login = (options) => {
    let tasks = [
        pick([ 'email', 'password' ]),
        User.throwIfPasswordIncorrect,
        User.get,
        Accesstoken.create,
        pick([ 'token' ])
    ];

    return pipeline(tasks, options);
}

exports.profile = (options) => {
    let tasks = [
        // TODO: schema check
        // TODO: data pickup
        pick([ '_id' ])
    ];

    return pipeline(tasks, options);
}
