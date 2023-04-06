const { Router } = require('express');
const passport = require('passport');
const { requireNoAuth } = require('../middlewares.js');

const router = Router();

router.get('/', requireNoAuth, (req, res) => {
  res.render('signup', { title: 'Signup', stylesheet: 'signup' })
})

router.post('/', requireNoAuth, passport.authenticate('signup'), async (req, res) => {
  try {
    const user = req.user;
    res.status(201).json({ message: 'success', data: user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/fail', async (req, res) => {
  console.log('Failed Strategy');
  res.send('Failed' );
})

module.exports = router