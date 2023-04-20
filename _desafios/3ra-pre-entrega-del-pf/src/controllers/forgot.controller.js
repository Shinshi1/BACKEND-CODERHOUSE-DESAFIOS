const USERSDAO = require('../dao/mongo/users.dao.js')
const { isValidPassword, createHash } = require('../utils.js');


const forgotPageController = async (req, res) => {
  res.render('forgot', { title: 'Forgot', stylesheet: 'login' })
};

const resetPasswordController = async (req, res) => {
  const { email, password, repeatPassword } = req.body;

  let newPassword = createHash(password)

  if (!email || !password || !repeatPassword) return res.status(400).send({ status: 'error', error: 'Incomplete values' })

  if (!isValidPassword(repeatPassword, newPassword)) {
    return res.status(400).json({ message: 'error', data: 'passwords do not match' })
  }


  try {
    const user = await USERSDAO.findByEmailForPasswordReset(email)

    if (!user) {
      return res.status(404).json({ message: 'error', data: 'User not exist' })
    } else {
      const user = await USERSDAO.updatePassword(email, newPassword)
      if (user) {
        return res.status(200).json({ message: 'success', data: 'Password Updated' })
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

module.exports = {
  forgotPageController,
  resetPasswordController
};