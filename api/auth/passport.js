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
            // console.log('accessToken', accessToken.User);
            if (accessToken) {
                return done(null, accessToken.User);
            } else {
                return done(null, false);
            }
        });
    }
));

// passport.serializeUser(function (user, done) {
//     done(null, user._id);
// });

// passport.deserializeUser(function (_id, done) {
//     done(null, { _id: 1 });
//     // db.users.findById(_id, function (err, user) {
//     //   if (err) { return cb(err); }
//     //   cb(null, user);
//     // });
// });

module.exports = passport;
