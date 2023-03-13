const { Router } = require('express');
const passport = require('passport');
const { requireNoAuth } = require('../middlewares.js');

const router = Router();

router.get('/', requireNoAuth, (req, res) => {
  res.render('login', { title: 'Login', stylesheet: 'login' })
})


router.post('/', passport.authenticate('login', { failureRedirect: '/login/faillogin' }), async (req, res) => {
  if (!req.user) return res.status(400).send({ status: 'error', error: 'Incomplete values' })
  try {
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email
    }
    res.send({ status: 'success', payload: req.user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/faillogin', (req, res) => {
  res.send({ error: 'Failed Login' })
})


// router.post('/', requireNoAuth, async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) return res.status(400).send({ status: 'error', error: 'Incomplete values' })
//   try {
//     const user = await userModel.findOne({ email: username }, { email: 1, first_name: 1, last_name: 1, password: 1 })
//     if (user) {
//       if (isValidPassword(password, user.password)) {
//         delete user.password;
//         req.session.user = user;
//         res.status(200).json({ message: 'success', data: user })
//       } else {
//         res.status(401).json({message:'error', data:'incorrect password or email'})
//       }
//     } else {
//       res.status(404).json({ message: 'error', data: 'login error' })
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })


module.exports = router