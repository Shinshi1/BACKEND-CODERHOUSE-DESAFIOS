const { Router } = require('express')
const userModel = require('../dao/models/users.model.js');
const { requireNoAuth } = require('../middlewares.js');
const { isValidPassword } = require('../utils.js');

const router = Router();

router.get('/', requireNoAuth, (req, res) => {
  res.render('login', { title: 'Login', stylesheet: 'login' })
})

router.post('/', requireNoAuth, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({ status: 'error', error: 'Incomplete values' })
  try {
    const user = await userModel.findOne({ email: username }, { email: 1, first_name: 1, last_name: 1, password: 1 })
    if (user) {
      if (isValidPassword(password, user.password)) {
        delete user.password;
        req.session.user = user;
        res.status(200).json({ message: 'success', data: user })
      } else {
        res.status(401).json({message:'error', data:'incorrect password or email'})
      }
    } else {
      res.status(404).json({ message: 'error', data: 'login error' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router