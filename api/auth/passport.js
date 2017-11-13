const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const models = require('../../models');
const { ServerError } = require('../middleware/error-handler');

passport.use(new BearerStrategy(
    function (accessToken, done) {
        return models.Accesstoken.findOne({
            where: { token: accessToken },
            include: [{
                model: models.User
            }]
        }).then(accessToken => {
            if (accessToken) {
                return done(null, accessToken.User);
            } else {
                return done(new ServerError({ message: 'Unauthorized', statusCode: 401 }), false);
            }
        });
    }
));

module.exports = passport;
