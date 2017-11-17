const path = require('path');

module.exports = {
    'db': {
        dialect: 'postgres',
        host: 'fa17-cs411-02.cs.illinois.edu',
        username: 'user',
        password: 'Xweg6LTqndkuetCX',
        database: 'iwap',
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
