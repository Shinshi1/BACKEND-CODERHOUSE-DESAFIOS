const { usersService } = require('../repositories/index.js');
const CustomError = require('../services/errors/CustomError.js');
const EErrors = require('../services/errors/enums.js').default;
const { generateValidationErrorInfo } = require('../services/errors/info.js');
const { isValidPassword, createHash } = require('../utils.js');


const forgotPageController = async (req, res) => {
  res.render('forgot', { title: 'Forgot', stylesheet: 'login' })
};

const resetPasswordController = async (req, res) => {
  const { email, password, repeatPassword } = req.body;

  let newPassword = createHash(password)


  try {
    if (!email || !password || !repeatPassword) {
      throw CustomError.createError({
        name: 'InvalidRequestError',
        cause: { message: 'Por favor completa todos los campos' },
        message: 'Incomplete Values',
        code: EErrors.INVALID_TYPES_ERROR
      })
    }

    if (!isValidPassword(repeatPassword, newPassword)) {
      return res.status(400).json({ message: 'error', data: 'passwords do not match' })
      // CustomError.createError({
      //   name: 'InvalidRequestError',
      //   cause: '',
      //   message: 'Passwords do not match',
      //   code: EErrors.PASSWORDS_DO_NOT_MATCH
      // })
    }

    const user = await usersService.resetPassword(email)

    if (!user) {
      return res.status(404).json({ message: 'error', data: 'User not exist' })
      // CustomError.createError({
      //   name: 'NotFoundError',
      //   code: EErrors.USER_NOT_EXIST,
      //   message: 'User not exist',
      // })
    } else {
      const user = await usersService.updateUserPassword(email, newPassword)
      console.log(user)
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