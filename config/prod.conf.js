const path = require('path');

module.exports = {
    'db': {
        dialect: 'mysql',
        host: '',
        port: 3306,
        username: '',
        password: '',
        database: '',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: false,
        define: {
            underscored: true
        }
    },
    'file': {
        path: path.join(__dirname, '../files'),
        mimetype: ['image/gif', 'image/x-png', 'image/pjpeg', 'image/jpg', 'image/jpeg', 'image/png']
    }
};
