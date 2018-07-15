/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
const jwt = require('jsonwebtoken');

const uuidv4 = require('uuid/v4');

module.exports = {
  login: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if (err || !user) {
        return res.send({
          message: info.message,
          user
        });
      }

      req.login(user, function(err) {
        console.log(req.user);
        if (err) res.send(err);
        const token = jwt.sign(user, sails.config.secret, { jwtid: uuidv4(), expiresIn: 60 * 60 * 24 });

        return res.send({
          message: info.message,
          user,
          token
        });
      });
    })(req, res);
  },
  logout: function(req, res) {
    req.logout();
    req.session.destroy();
    console.log(req.user);
    res.status(204).send();
  }
};
