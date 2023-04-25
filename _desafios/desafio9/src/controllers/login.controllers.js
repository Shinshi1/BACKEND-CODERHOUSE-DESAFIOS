const showLoginForm = async (req, res) => {
  res.render('login', { title: 'Login', stylesheet: 'login' })
}

const processLogin = async (req, res) => {
  if (!req.user) return res.status(400).send({ status: 'error', error: 'Incomplete values' })
  // console.log(req)
  try {
    console.log('req.session', req.session)
    console.log('req.session.passport.user', req.session.passport.user)
    req.session.user = {
      _id: req.session.passport.user,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email
    }
    console.log('req.session.user', req.session.user)
    res.send({ status: 'success', payload: req.user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const showFailedLogin = async (req, res) => {
  res.send({ error: 'Failed Login' })
}

const loginWithGitHub = async (req, res) => {

}

const loginWithGitHubCallback = async (req, res) => {
  req.session.user = req.user;
  res.redirect('/')
}

module.exports = {
  showLoginForm,
  processLogin,
  showFailedLogin,
  loginWithGitHub,
  loginWithGitHubCallback
}