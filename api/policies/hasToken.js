var expressJwt = require('express-jwt');
var secret = sails.config.secret;

const isRevoked = function(req, payload, done) {
  return done(null, false);
};

module.exports = function(req, res, next) {
  expressJwt({ secret: secret, isRevoked })(req, res, function(err) {
    if (err) {
      if (err.status) {
        res.status(err.status).send(err);
      } else {
        next(err);
      }
    } else {
      next();
    }
  });
};
