const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  next();
}

const requireNoAuth = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/profile')
  }
  next();
}

module.exports = {
  requireAuth,
  requireNoAuth
}