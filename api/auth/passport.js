const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('../../models').User;

passport.use(new Strategy(
    function (username, password, done) {
        User.findByUsername('test').then(user => {
            console.log(user);
        }).catch(e => {
            console.log(e);
        });
        return done(null, { _id: 1 });
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
