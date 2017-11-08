var express = require('express');
var api = require('.');
// var tmpdir = require('os').tmpdir;
// var upload = require('multer')({dest: tmpdir()});
var passport = require('./auth').passport;
const checkPermission = require('./auth').permission.checkPermission;

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

    apiRouter.post('/comment',
        authPrivate,
        api.wrapper(require('./controllers/comment').post));

    apiRouter.get('/comment/:id',
        // authPrivate,
        api.wrapper(require('./controllers/comment').get));
    apiRouter.put('/comment/:id',
        authPrivate,
        api.wrapper(require('./controllers/comment').update));
    apiRouter.delete('/comment/:id',
        authPrivate,
        api.wrapper(require('./controllers/comment').delete));
    apiRouter.get('/course/:id/comments',
        api.wrapper(require('./controllers/comment').getCommentsOfCourse));

    apiRouter.get('/user/comments',
        authPrivate,
        api.wrapper(require('./controllers/comment').getAllMyComments));

    apiRouter.post('/notification',
        authPrivate,
        api.wrapper(() => {}));
    apiRouter.delete('/notification/:id',
        authPrivate,
        api.wrapper(() => {}));
    apiRouter.get('/user/notifications',
        authPrivate,
        api.wrapper(() => {}));

    return apiRouter;
};

