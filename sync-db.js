const Promise = require('bluebird');

var models = require('./models');

var Spinner = require('clui').Spinner;

if (process.env.NODE_ENV !== 'dev') {
    let config = models.config;
    console.log(`Connecting [${config.database}]:[${config.host}] via [${config.dialect}] with [${config.username}]`);
}

Promise.resolve().then(() => {
    return require('@justinc/yesno')({ message: 'confirm?' });
}).then((answer) => {
    if (!answer.yes) throw new Error('canceled');
}).delay(500).then(() => {
    Spinner = new Spinner('Authenticating...  ');
    Spinner.start();
    return models.sequelize.authenticate();
}).delay(500).then(() => {
    Spinner.message('Syncing...       ');
    return models.sequelize.sync({ force: true, logging: false });
}).delay(500).then(() => {
    Spinner.message('Creating default data...');
    return Promise.all([
        models.School.create({ name: 'UIUC' }),
        models.Group.create({ name: 'default' }),
        models.Group.create({ name: 'admin' }),
        models.Permission.create({ name: 'view_profile', GroupId: 1 }, {
            include: [{ model: models.Group }]
        }),
        models.Permission.create({ name: 'upload_csv', GroupId: 2 }, {
            include: [{ model: models.Group }]
        })
    ]);
}).done(() => {
    Spinner.stop();
    models.sequelize.close();
    console.log('sync finished.');
});
