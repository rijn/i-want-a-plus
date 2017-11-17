const tryRequire = require('tryrequire');
const path = require('path');
const merge = require('lodash').merge;

let prodConf = {};
try {
    prodConf = require('./prod.conf');
} catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
    }
};

module.exports = merge(prodConf, {
    'db': process.env.REMOTE_DB ? {
        database: 'iwap-test'
    } : process.env.LOCAL_POSTGRES ? {
        host: 'localhost',
        username: '',
        password: '',
        database: 'iwap',
        logging: true,
    } : {
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
        path: path.join(__dirname, '../files'),
        mimetype: ['image/gif', 'image/x-png', 'image/pjpeg', 'image/jpg', 'image/jpeg', 'image/png']
    }
});
