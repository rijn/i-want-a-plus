const path = require('path');
const merge = require('lodash').merge;

var devConf = require('./dev.conf');

module.exports = merge(devConf, {
    'db': {
        dialect: 'sqlite',
        storage: './dev.db',
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'nodecho',
        logging: false,
        define: {
            underscored: false
        }
    },
    'file': {
        path: path.join(__dirname, '../tmp'),
        mimetype: ['image/gif', 'image/x-png', 'image/pjpeg', 'image/jpg', 'image/jpeg', 'image/png']
    }
});
