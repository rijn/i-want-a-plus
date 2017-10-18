var express = require('express');
var routes = require('./routes');
var errorHandler = require('./middleware/error-handler');
var bodyParser = require('body-parser');

module.exports = function setupApiApp () {
    var apiApp = express();

    apiApp.use(bodyParser.json({limit: '1mb'}));
    apiApp.use(bodyParser.urlencoded({extended: true, limit: '1mb'}));

    apiApp.use(routes());

    apiApp.use(errorHandler.resourceNotFound);
    apiApp.use(errorHandler.handleJSONResponse);

    return apiApp;
};
