const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const models = require('../../models');

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
                return done(null, false);
            }
        });
    }
));

module.exports = passport;
