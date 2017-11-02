const path = require('path');

module.exports = {
    'db': {
        dialect: 'mysql',
        host: 'fa17-cs411-02.cs.illinois.edu',
        port: 3306,
        username: 'simple',
        password: 's0metimesNaive*',
        database: 'iWantAPlus',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: false,
        define: {
            underscored: false
        }
    },
    'file': {
        path: path.join(__dirname, '../files'),
        mimetype: ['image/gif', 'image/x-png', 'image/pjpeg', 'image/jpg', 'image/jpeg', 'image/png']
    }
};
