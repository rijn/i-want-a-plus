const models = require('../../models');
const errorHandler = require('../middleware/error-handler');
const Promise = require('bluebird');
const random = require('../utils/random');
const scrypt = require('scrypt');
const _ = require('lodash');

module.exports = {
    model: models.User,
    findByEmail: (username) => {
        return models.User.findOne({ where: { username } }).then(user => {
            if (!user) throw new errorHandler.ServerError({ message: 'No user', statusCode: 404 });
            return user;
        });
    },
    isEmailAlreadyExist: (options) => {
        return models.User.findOne({ where: { email: options.email } }).then(user => {
            if (user) throw new errorHandler.ServerError({ message: 'User already existed', statusCode: 409 });
            return options;
        });
    },
    create: (options) => {
        let { email, password } = options;
        salt = random(16);
        return scrypt
            .kdf(password + salt, { N: 2, r: 1, p: 1 })
            .then(result => result.toString('base64'))
            .then(password => {
                return models.User.create({ email, password, salt });
            })
            .then(user => {
                return _.assign(options, { _id: user._id });
            });
    },
    isPasswordCorrect: (email, password) => {

    }
};
