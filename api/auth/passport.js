const passport = require('passport');
const Strategy = require('passport-local').Strategy;

passport.use(new Strategy(
    function (username, password, done) {
        return done(null, { _id: 1 });
        // db.users.findByUsername(username, function (err, user) {
        // if (err) { return cb(err); }
        // if (!user) { return cb(null, false); }
        // if (user.password !== password) { return cb(null, false); }
        // return cb(null, user);
        // });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
    done(null, { _id: 1 });
    // db.users.findById(_id, function (err, user) {
    //   if (err) { return cb(err); }
    //   cb(null, user);
    // });
});

module.exports = passport;
