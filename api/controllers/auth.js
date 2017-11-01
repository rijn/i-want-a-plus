var models = require('../../models');
var pipeline = require('../utils/pipeline');

const User = require('../models').User;

exports.login = (req, res, next) => {
    User.findByEmail(req.body.email).then(user => {
        return req.login({ _id: 1 }, (err) => {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    }).catch(e => {
        console.log(e);
        next(e);
    });
};

exports.logout = (req, res, next) => {
    req.logout();
    return res.redirect('/');
};
