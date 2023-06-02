const { usersService } = require('../repositories/index.js');
const CustomError = require('../services/errors/CustomError.js');
const EErrors = require('../services/errors/enums.js').default;
// const { generateValidationErrorInfo } = require('../services/errors/info.js');
const { isValidPassword, createHash } = require('../utils/bcryptUtils.js');


const forgotPageController = async (req, res) => {
  res.render('forgot', { title: 'Forgot', stylesheet: 'login' })
};

const resetPasswordController = async (req, res) => {
  const { email, password, repeatPassword } = req.body;

  let newPassword = createHash(password)


  try {
    if (!email || !password || !repeatPassword) {
      req.logger.error('Incomplete Values')
      throw CustomError.createError({
        name: 'InvalidRequestError',
        cause: { message: 'Por favor completa todos los campos' },
        message: 'Incomplete Values',
        code: EErrors.INVALID_TYPES_ERROR
      })
    }

    if (!isValidPassword(repeatPassword, newPassword)) {
      req.logger.warning('passwords do not match')
      return res.status(400).json({ message: 'error', data: 'passwords do not match' })
    }

    const user = await usersService.resetPassword(email)

    if (!user) {
      req.logger.warning('User not exist')
      return res.status(404).json({ message: 'error', data: 'User not exist' })
    } else {
      const user = await usersService.updateUserPassword(email, newPassword)
      console.log(user)
      if (user) {
        req.logger.info('Password Updated')
        return res.status(200).json({ message: 'success', data: 'Password Updated' })
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message })
  }
};

module.exports = {
  forgotPageController,
  resetPasswordController
};