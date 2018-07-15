/**
 * BookController
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
  info: function(req, res) {
    res.send(req.user);
  },
  borrow: (req, res) => {
    Book.borrow(req.params.bookId, req.params.userId)
      .then(sendOK(res))
      .catch(sendKO(res));
  },
  return: (req, res) => {
    Book.return(req.params.bookId, req.params.userId)
      .then(sendOK(res))
      .catch(sendKO(res));
  },
  book: (req, res) => {
    Book.book(req.params.bookId, req.params.userId)
      .then(sendOK(res))
      .catch(sendKO(res));
  },
  unbook: (req, res) => {
    Book.unbook(req.params.bookId, req.params.userId)
      .then(sendOK(res))
      .catch(sendKO(res));
  }
};
