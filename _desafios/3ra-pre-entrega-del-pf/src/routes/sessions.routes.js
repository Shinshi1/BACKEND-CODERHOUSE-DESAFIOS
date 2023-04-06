const { Router } = require('express')
const userModel = require('../dao/models/users.model.js')

const router = Router();

router.get('/', async (req, res) => {  //esta es mi ruta /current
  const userId = req.session.user?._id; //hacer que en vez de `_id` sea `email`
  try {
    if (userId) {
      const user = await userModel.findById(userId)
        .select('first_name last_name').lean()
      res.json({ message: 'User found', user: user })
    } else {
      res.send('Sesión Expirada, porfavor vuelva a Iniciar Sesión')
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router