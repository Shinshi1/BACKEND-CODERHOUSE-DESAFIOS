const { Router } = require('express')
const userModel = require('../dao/models/users.model.js');
const { requireNoAuth } = require('../middlewares.js');

const router = Router();

router.get('/', requireNoAuth, (req, res) => {
  res.render('signup', { title: 'Signup', stylesheet: 'signup' })
})

router.post('/', requireNoAuth, async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;
  try {
    const user = await userModel.create({
      first_name,
      last_name,
      email,
      password,
      age
    });
    // res.redirect('/api/login')
    res.status(201).json({ message: 'success', data: user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router