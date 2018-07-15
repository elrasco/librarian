module.exports = function(req, res, next) {
  if (req.user && (req.user.role === 'admin' || req.user.id === req.params.userId)) {
    next();
  } else {
    res.forbidden();
  }
};
