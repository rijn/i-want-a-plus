var express = require('express');
var api = require('.');
const { wrapper } = api;
// var tmpdir = require('os').tmpdir;
// var upload = require('multer')({dest: tmpdir()});
var passport = require('./auth').passport;
const checkPermission = require('./auth').permission.checkPermission;
const { paramExtract } = require('./utils');
const _ = require('lodash');

const commentController = require('./controllers/comment');
const notifyController = require('./controllers/notify');

module.exports = function apiRoutes () {
    var apiRouter = express.Router();

    let authPrivate = passport.authenticate('bearer', { session: false });

    apiRouter.get('/test', api.wrapper(api.test));

    apiRouter.post('/user', api.wrapper(require('./controllers/user').signup));
    apiRouter.post('/user/login', api.wrapper(require('./controllers/user').login));
    apiRouter.get('/user/profile',
        authPrivate,
        checkPermission(['view_profile']),
        api.wrapper(require('./controllers/user').profile));

    apiRouter.post('/data/upload_csv',
        authPrivate,
        // checkPermission(['upload_csv']),
        api.wrapper(require('./controllers/data').updateCsv));

    apiRouter.get('/course',
        api.wrapper(require('./controllers/course').get));
    apiRouter.get('/course/:id',
        api.wrapper(require('./controllers/course').getById));

    apiRouter.get('/professor/ac',
        api.wrapper(require('./controllers/professor').ac));
    apiRouter.get('/professor/:id',
        api.wrapper(require('./controllers/professor').getById));

    apiRouter.post('/comment',
        authPrivate,
        api.wrapper(require('./controllers/comment').post));

    // Comment

    apiRouter.get('/comment/:id', wrapper(commentController.get));
    apiRouter.put('/comment/:id', authPrivate, wrapper(commentController.update));
    apiRouter.delete('/comment/:id', authPrivate, wrapper(commentController.delete));

    apiRouter.get('/user/comment', authPrivate, wrapper(commentController.getAllMyComments));

    _.each([ 'course', 'section', 'professor' ], role => {
        let endpoint = `/${role}/:id/comment`;
        let pe = { id: _.capitalize(role) + 'Id' };
        apiRouter.get(endpoint, paramExtract(pe), wrapper(commentController.get));
        apiRouter.post(endpoint, authPrivate, paramExtract(pe), wrapper(commentController.post));
    });

    apiRouter.post('/notification',
        authPrivate,
        api.wrapper(() => {}));
    apiRouter.delete('/notification/:id', authPrivate, wrapper(notifyController.delete));
    apiRouter.get('/user/notifications', authPrivate, wrapper(notifyController.getAllCourses));

    return apiRouter;
};

