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
            })
        ]);
    });
}).done();
