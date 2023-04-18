const USERSDAO = require('../dao/mongo/users.dao.js');
const UserDTO  = require('../dao/DTOs/user.dto.js')


const getCurrentUser = async (req, res) => {
  const userEmail = req.session.user?.email; //hacer que en vez de `_id` sea `email`
  try {
    if (userEmail) {
      const user = await USERSDAO.findByEmail(userEmail)
      const userDTO = UserDTO.createSubset(user, ['first_name', 'last_name']);
      res.json({ message: 'User found', user: userDTO })
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