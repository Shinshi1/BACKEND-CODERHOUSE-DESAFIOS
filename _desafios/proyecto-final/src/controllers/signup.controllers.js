const showSignupForm = async (req, res) => {
  res.render('signup', { title: 'Signup', stylesheet: 'signup' })
}

const processSignup = async (req, res) => {
  try {
    const user = req.user;
    req.logger.info('registered user')
    res.status(201).json({ message: 'success', data: user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const showFailedSignup = async (req, res) => {
  console.log('Failed Strategy');
  res.status(302).send('Failed');
}

module.exports = {
  showSignupForm,
  processSignup,
  showFailedSignup,
}

