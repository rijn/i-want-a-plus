var _ = require('lodash');
var _private = {};
var errorHandler = {};

function ServerError (w) {
    var instance = new Error(w.message);
    instance.statusCode = w.statusCode;
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    Error.captureStackTrace(instance, ServerError);
    return instance;
}

ServerError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
});

if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ServerError, Error);
} else {
    ServerError.__proto__ = Error; // eslint-disable-line
}

_private.prepareError = function prepareError (err, req, res, next) {
    if (_.isArray(err)) {
        err = err[0];
    }

    req.err = err;

    res.statusCode = err.statusCode || 500;

    res.set({
        'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
    });

    next(err);
};

_private.JSONErrorRenderer = function JSONErrorRenderer (err, req, res, next) {
    res.json({
        errors: [{
            message: err.message,
            context: err.context
        }]
    });
};

_private.BasicErorRenderer = function BasicErrorRenderer (err, req, res, next) {
    return res.send(res.statusCode + ' ' + err.message);
};

errorHandler.resourceNotFound = function resourceNotFound (req, res, next) {
    next(new ServerError({ message: 'Resource Not Found', statusCode: 404 }));
};

errorHandler.handleJSONResponse = [
    _private.prepareError,
    _private.JSONErrorRenderer
];

module.exports = errorHandler;
