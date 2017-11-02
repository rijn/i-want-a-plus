const passport = require('passport');
const authUtils = require('./utils');
const models = require('../../models');

const authenticate = {
    authenticateUser: function authenticateUser(req, res, next) {
        return passport.authenticate('bearer', { session: false, failWithError: false },
            function authenticate(err, user, info) {
                if (err) {
                    return next(err);
                }

                if (user) {
                    req.authInfo = info;
                    req.user = user;

                    return next(null, user, info);
                } else if (authUtils.getBearerAutorizationToken(req)) {
                    return next(new errors.UnauthorizedError({
                    }));
                } else if (req.client) {
                    req.user = {id: models.User.externalUser};
                    return next();
                }

                return next(new errors.UnauthorizedError({
                }));
            }
        )(req, res, next);
    }
};

module.exports = authenticate;
