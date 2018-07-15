module.exports = function(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.forbidden();
  }
};
