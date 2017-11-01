var express = require('express');
var routes = require('./routes');
var errorHandler = require('./middleware/error-handler');
var bodyParser = require('body-parser');

module.exports = function setupApiApp () {
    var apiApp = express();

    apiApp.use(bodyParser.urlencoded({ extended: true }));
    apiApp.use(bodyParser.json());
    apiApp.use(require('cookie-parser')());
    apiApp.use(require('express-session')({ secret: 'i-want-a-plus', resave: true, saveUninitialized: true }));

    var passport = require('./auth').passport;

    apiApp.use(passport.initialize());
    apiApp.use(passport.session());

    apiApp.use(routes());
    // routes(apiApp);

    apiApp.use(errorHandler.ResourceNotFoundError);
    apiApp.use(errorHandler.handleJSONResponse);

    return apiApp;
};
