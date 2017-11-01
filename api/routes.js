var express = require('express');
var api = require('.');
// var tmpdir = require('os').tmpdir;
// var upload = require('multer')({dest: tmpdir()});
var passport = require('./auth').passport;

module.exports = function apiRoutes () {
    var apiRouter = express.Router();

    apiRouter.get('/test', api.wrapper(api.test));

    apiRouter.get('/auth/login', require('./controllers/auth').login);
    apiRouter.get('/auth/logout', require('./controllers/auth').logout);

    apiRouter.post('/user', api.wrapper(require('./controllers/user').signup));

    return apiRouter;
};
