const { usersService } = require('../repositories/index.js');
const CustomError = require('../services/errors/CustomError.js');
const EErrors = require('../services/errors/enums.js').default;
const { generateValidationErrorInfo } = require('../services/errors/info.js');
const { isValidPassword, createHash } = require('../utils.js');

const { resetPasswordModel } = require('../dao/mongo/models/resetpassword.model.js')  //ordenar este model (hacer su DAO y su Service/Repository)
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const NODE_MAILER_USER = process.env.NODE_MAILER_USER;
const NODE_MAILER_PASS = process.env.NODE_MAILER_PASS;
const NODE_MAILER_PORT = process.env.NODE_MAILER_PORT;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: NODE_MAILER_PORT,
  auth: {
    user: NODE_MAILER_USER,
    pass: NODE_MAILER_PASS
  },
});

const sendResetPasswordEmail = async (datos) => {
  const { key, token } = datos;

  let result = await transporter.sendMail({
    from: "Coder house 37570<gabi.hidalgo.003@gmail.com>",
    to: key,
    subject: "Correo",
    text: "Hola, esto es una prueba de envio de correo",
    html: `<div><h1>Hola, esto es una prueba de envio de correo</h1>
      <a href="http://localhost:8080/forgot/${token}">Click aquí para resetear tu contraseña</a>
      </div>`,
  })

  return result;
}

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
      if (user) {
        return res.status(200).json({ message: 'success', data: 'Password Updated' })
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const resetPasswordEmailController = async (req, res) => {
  // Se resetea el password usando el token generado
  const { key } = req.params;
  const { password, confirmPassword } = req.body;
  let newPassword = createHash(password);

  try {
    const tokenExist = await resetPasswordModel.findOne({ token: key })

    if (tokenExist) {
      if (!isValidPassword(confirmPassword, newPassword)) {
        return res.status(404).json({ message: 'error', data: 'passwords do not match' })
      }
      const user = await usersService.resetPassword(tokenExist.email)
      console.log('user', user)
      
      if (isValidPassword(confirmPassword, user.password)) {
        return res.status(404).json({message: 'error', data: 'Cannot reset the password using the old password'})
      }

      if(!user) {
        return res.status(404).json({message: 'error', data: 'User not exist'})
      } else {
        const user = await usersService.updateUserPassword(tokenExist.email, newPassword)
        if(user) {
          return res.status(200).json({message: 'success', data: 'Password Updated'})
        }
      }
    } else {
      res.send('ERROR')
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }

};

const resetPasswordCreateController = async (req, res) => {
  // se crea el token
  const { key } = req.params;

  const token = crypto.randomBytes(20).toString('hex');
  // send Mail
  sendResetPasswordEmail({ key, token })


  const resetPassword = new resetPasswordModel({
    email: key,
    token: token,
    status: true,
  })

  const result = await resetPassword.save();

  if (result) {
    res.send(`Reset password for user ${result}`);
  } else {
    res.send('ERROR')
  }
}

const resetPasswordPageController = async (req, res) => {
  res.render('resetpassword', { title: 'Reset Password', stylesheet: 'resetpassword' })

}


module.exports = {
  forgotPageController,
  resetPasswordController,
  resetPasswordEmailController,
  resetPasswordCreateController,
  resetPasswordPageController
};