var passport = module.parent.exports.passport,
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/user.js').User;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('UserLogin', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
              var user = new User({username: username, password: password});
              user.save(function (err) {
                  if (err) return done(err);
                  return done(null, user);
              });
              return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.checkPassword(password)) {

              return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
      });
  }
));