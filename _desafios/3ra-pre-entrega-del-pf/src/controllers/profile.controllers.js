const USERSDAO = require('../dao/mongo/users.dao.js')
const UserDTO = require('../dao/DTOs/user.dto.js')

const getProfileInfo = async (req, res) => {
  const userId = req.session.user?._id;
  try {
    if (userId) {
      const user = await USERSDAO.findById(userId)
      const userDTO = new UserDTO(user)
      res.render('profile', { title: 'Profile', stylesheet: 'profile', user: userDTO })
    } else {
      res.send('Sesión Expirada, porfavor vuelva a Iniciar Sesión')
    }

  } catch (error) {
    res.status(500).json({ message: error.message })

  }
}

const userLogout = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (!err) {
        res.redirect('/login')
      }
      else res.send({ status: `logout ERROR`, body: err })
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
getProfileInfo,
userLogout
}