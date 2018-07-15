/**
 * BookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  info: function(req, res) {
    res.send(req.user);
  },
  borrow: (req, res) => {
    Book.borrow(req.params.bookId, req.params.userId)
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        res.serverError(error);
      });
  }
};
