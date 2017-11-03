const models = require('../../models');
const _ = require('lodash');
const errorHandler = require('../middleware/error-handler');

const getPermission = function (req) {
    return req.user.getGroup().then(group => {
        return group.getPermissions();
    }).then(permissions => _.map(permissions, 'name'));
};

const checkPermission = function (permissions) {
    return function (req, res, next) {
        getPermission(req).then((ps) => {
            if (!_(permissions).difference(ps).isEmpty()) {
                next(new errorHandler.ServerError({ message: 'Unauthorized', statusCode: 401 }));
            }
            next();
        })
    };
};

exports.checkPermission = checkPermission;
