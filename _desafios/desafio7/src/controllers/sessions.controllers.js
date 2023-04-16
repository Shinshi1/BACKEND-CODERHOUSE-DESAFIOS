const USERSDAO = require('../dao/mongo/users.dao.js');

const getCurrentUser = async (req, res) => {
  const userEmail = req.session.user?.email; //hacer que en vez de `_id` sea `email`
  try {
    if (userEmail) {
      const showDataProfile = true
      const user = await USERSDAO.findByEmail(userEmail, showDataProfile)
      res.json({ message: 'User found', user: user })
    } else {
      res.send('Sesión Expirada, porfavor vuelva a Iniciar Sesión')
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getCurrentUser
}