const { Router } = require('express')
const userModel = require('../dao/models/users.model.js');
const { requireNoAuth } = require('../middlewares.js');

const router = Router();

router.get('/', requireNoAuth, (req, res) => {
  res.render('login', { title: 'Login', stylesheet: 'login' })
})

router.post('/', requireNoAuth, async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await userModel.findOne({ email: username, password: password })
    if (response) {
      req.session.user = response
      res.status(200).json({ message: 'success', data: response })
    } else {
      res.status(401).json({ message: 'error', data: 'login error' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router