const Q = require('q');

var models = require('./models');

module.exports = Q.fcall(() => {
    return models.sequelize.authenticate();
}).then(() => {
    return models.sequelize.sync({ force: true, logging: false });
}).then(() => {
    return models.sequelize.transaction(function (t1) {
        return Promise.all([
            models.Group.create({ name: 'default' }),
            models.Group.create({ name: 'admin' }),
            models.Permission.create({ name: 'view_profile', GroupId: 1 }, {
                include: [{ model: models.Group }]
            }),
            models.Permission.create({ name: 'upload_csv', GroupId: 2 }, {
                include: [{ model: models.Group }]
            }),
            models.Course.create({
                subject: 'CS',
                course: 125,
                title: 'Programming',
                crn: '12345',
                term: 'Fall',
                year: 2016,
                section: 'A',
                PastCourse: {
                    ap: 9,
                    a:  8,
                    am: 3,
                    bp: 0,
                    b:  6,
                    bm: 0,
                    cp: 1,
                    c:  1,
                    cm: 0,
                    dp: 0,
                    d:  0,
                    dm: 0,
                    f:  0,
                    w:  0
                }
            }, {
                include: [ models.PastCourse ]
            })
        ]);
    });
}).done();

