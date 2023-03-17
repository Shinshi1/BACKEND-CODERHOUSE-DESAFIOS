const { Router } = require('express')
const userModel = require('../dao/models/users.model.js');
const { requireNoAuth } = require('../middlewares.js');
const { isValidPassword, createHash } = require('../utils.js');

const router = Router();

router.get('/', requireNoAuth, (req, res) => {
  res.render('forgot', { title: 'Forgot', stylesheet: 'login' })
})

router.post('/', requireNoAuth, async (req, res) => {
  const { email, password, repeatPassword } = req.body;

  let newPassword = createHash(password)

  if (!email || !password || !repeatPassword) return res.status(400).send({ status: 'error', error: 'Incomplete values' })

  if (!isValidPassword(repeatPassword, newPassword)) {
    return res.status(400).json({ message: 'error', data: 'passwords do not match' })
  }


  try {
    const user = await userModel.findOne({ email: email }, { email: 1, first_name: 1, last_name: 1, password: 1 })

    if (!user) {
      return res.status(404).json({message: 'error', data: 'User not exist'})
    } else {
      const user = await userModel.findOneAndUpdate({email: email}, {password: newPassword})
      if(user) {
        return res.status(200).json({message: 'success', data: 'Password Updated'})
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router