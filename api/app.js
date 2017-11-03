var path = require('path');
var express = require('express');
var routes = require('./routes');
var errorHandler = require('./middleware/error-handler');
var bodyParser = require('body-parser');
var multer = require('multer');
var storage = multer.memoryStorage();

module.exports = function setupApiApp () {
    var apiApp = express();

    apiApp.use(bodyParser.urlencoded({ extended: true }));
    apiApp.use(bodyParser.json());
    // apiApp.use(require('cookie-parser')());
    // apiApp.use(require('express-session')({ secret: 'i-want-a-plus', resave: true, saveUninitialized: true }));

    apiApp.use(multer({
        // dest: path.join(__dirname, '.files'),
        limits: {
            fieldNameSize: 100,
            files: 1,
            fileSize: 1 * 1024 * 1024
        },
        storage: storage
    }).any());

    var passport = require('./auth').passport;

    apiApp.use(passport.initialize());
    // apiApp.use(passport.session());

    apiApp.use(routes());
    // routes(apiApp);

    apiApp.use(errorHandler.ResourceNotFoundError);
    apiApp.use(errorHandler.handleJSONResponse);

    return apiApp;
};
