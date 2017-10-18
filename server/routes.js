var express = require('express');
var server = require('.');
// var tmpdir = require('os').tmpdir;
// var upload = require('multer')({dest: tmpdir()});

module.exports = function apiRoutes () {
    var apiRouter = express.Router();

    apiRouter.get('/test', server.wrapper(server.test));

    return apiRouter;
};
