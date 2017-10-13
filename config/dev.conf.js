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
    'file': {
        path: path.join(__dirname, '../files'),
        mimetype: ['image/gif', 'image/x-png', 'image/pjpeg', 'image/jpg', 'image/jpeg', 'image/png']
    }
});
