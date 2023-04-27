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

const isAdmin = async (req, res, next) => {
  const userEmail = req.session.user?.email;
  try {
    if (userEmail) {
      const user = await usersService.getUserByEmail(userEmail);
      if (user.role === 'admin') {
        next();
      } else {
        res.status(403).json({ message: 'Access denied' })
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const isUser = async (req, res, next) => {
  const userEmail = req.session.user?.email;
  try {
    if (userEmail) {
      const user = await usersService.getUserByEmail(userEmail);
      if (user.role === 'user') {
        next();
      } else {
        res.status(403).json({ message: 'Access denied' })
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  requireAuth,
  requireNoAuth,
  isAdmin,
  isUser,
}