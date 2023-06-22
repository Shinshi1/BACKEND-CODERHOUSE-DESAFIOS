const { usersService } = require('../repositories/index.js')


const getCurrentUser = async (req, res) => {
  const userEmail = req.session.user?.email;
  try {
    if (userEmail) {
      const user = await usersService.getUserByEmailDTOSubset(userEmail, ['first_name', 'last_name', 'cart', 'email', 'role']);
      res.json({ message: 'User found', user: user })
    } else {
      res.json({ message: 'Sesión Expirada, porfavor vuelva a Iniciar Sesión' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getCurrentUser
}