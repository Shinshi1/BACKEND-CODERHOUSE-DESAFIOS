const USERSDAO = require('../dao/mongo/users.dao.js')

const getProfileInfo = async (req, res) => {
  const userId = req.session.user?._id;
  const showDataProfile = true
  try {
    if (userId) {
      const user = await USERSDAO.findById(userId, showDataProfile)
      res.render('profile', { title: 'Profile', stylesheet: 'profile', user: user })
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