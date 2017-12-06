const Promise = require('bluebird');
const _ = require('lodash');
var models = require('./models');
uids = _.range(100);

models.sequelize.authenticate().then(() => {
    return Promise.map(uids, uid => {
        return models.User.create({
            email: 'test@test.com',
            password: '123456',
            salt: ''
        }).then(user => {
            uid = user.id;
        }).then(() => {
            return models.Course.findAll();
        }).then(courses => {
            return _.sampleSize(courses, _.ceil(courses.length * 0.3));
        }).then(courses => {
            return Promise.map(courses, course => {
                console.log(`insert ${course.id} with user ${uid}`);
                return models.Comment.create({
                    rating: _.random(1, 5),
                    CourseId: course.id,
                    UserId: uid
                });
            }, { concurrency: 1 });
        });
    }, { concurrency: 1 });
}).done(() => models.sequelize.close());
