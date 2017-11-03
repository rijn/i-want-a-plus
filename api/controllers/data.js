const utils = require('../utils');
const { pipeline, pick } = utils;
const { Accesstoken, User } = require('../model-helper');

exports.updateCsv = (options) => {
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
