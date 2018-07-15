/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const sendOK = res => result => {
  res.send(result);
};

const sendKO = res => error => {
  res.serverError(error);
};

module.exports = {
  canBorrow: (req, res) => {
    User.canBorrow(req.params.userId)
      .then(sendOK(res))
      .catch(sendKO(res));
  },
  canBook: (req, res) => {
    User.canBook(req.params.userId)
      .then(sendOK(res))
      .catch(sendKO(res));
  },
  enable: (req, res) => {
    User.enable(req.params.userId)
      .then(sendOK(res))
      .catch(sendKO(res));
  },
  disable: (req, res) => {
    User.disable(req.params.userId)
      .then(sendOK(res))
      .catch(sendKO(res));
  }
};
