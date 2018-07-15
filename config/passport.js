const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findOne({ id }, function(err, user) {
    cb(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passportField: 'password'
    },
    function(username, password, cb) {
      User.findOne({ username: username, status: 'enabled' }, function(err, user) {
        if (err) return cb(err);
        if (!user) return cb(null, false, { message: 'Username not found' });
        bcrypt.compare(password, user.password, function(err, res) {
          if (!res) return cb(null, false, { message: 'Invalid Password' });

          let userDetails = _.omit(user, ['history', 'created_at', 'updated_at', 'password']);
          return cb(null, userDetails, { message: 'Login Succesful' });
        });
      });
    }
  )
);
