const models = require('../../models');
const errorHandler = require('../middleware/error-handler');
const Promise = require('bluebird');
const random = require('../utils/random');
const scrypt = require('scrypt');
const _ = require('lodash');

const findByEmail = (email) => {
    return models.User.findOne({ where: { email } }).then(user => {
        if (!user) throw new errorHandler.ServerError({ message: 'No user', statusCode: 404 });
        return user;
    });
};

module.exports = {
    model: models.User,

    get: (options) => {
        return findByEmail(options.email).then(user => {
            return _.assign(options, { user });
        })
    },
    create: (options) => {
        let { email, password } = options;
        salt = random(16);
        return scrypt
            .kdf(password + salt, { N: 2, r: 1, p: 1 })
            .then(result => result.toString('base64'))
            .then(password => {
                return models.User.create({
                    email, password, salt,
                    GroupId: 1
                }, {
                    include: [{ model: models.Group }]
                });
            })
            .then(user => {
                return _.assign(options, { _id: user._id });
            });
    },
    throwIfEmailAlreadyExist: (options) => {
        return models.User.findOne({ where: { email: options.email } }).then(user => {
            if (user) throw new errorHandler.ServerError({ message: 'User already existed', statusCode: 409 });
            return options;
        });
    },
    throwIfPasswordIncorrect: (options) => {
        let { email, password } = options;
        let inputPassword = password;
        return findByEmail(email).then(({ password, salt }) => {
            return scrypt
                .verifyKdf(Buffer.from(password, 'base64'), inputPassword + salt);
        }).then(result => {
            if (!result) {
                throw new errorHandler.ServerError({ statusCode: 401 });
            }
            return options;
        });
    }
};
