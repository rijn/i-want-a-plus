var models = require('../../models');
var pipeline = require('../utils/pipeline');

exports.login = (req, res, next) => {
    return req.login({ _id: 1 }, (err) => {
        if (err) { return next(err); }
        return res.redirect('/');
    });
};

exports.logout = (req, res, next) => {
    req.logout();
    return res.redirect('/');
};
