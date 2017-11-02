var express = require('express');
var api = require('.');
// var tmpdir = require('os').tmpdir;
// var upload = require('multer')({dest: tmpdir()});
var passport = require('./auth').passport;

module.exports = function apiRoutes () {
    var apiRouter = express.Router();

    let authPrivate = passport.authenticate('bearer', { session: false });

    apiRouter.get('/test', api.wrapper(api.test));

    apiRouter.post('/user', api.wrapper(require('./controllers/user').signup));
    apiRouter.post('/user/login', api.wrapper(require('./controllers/user').login));
    apiRouter.get('/user/profile', authPrivate, api.wrapper(require('./controllers/user').profile));

    return apiRouter;
};
