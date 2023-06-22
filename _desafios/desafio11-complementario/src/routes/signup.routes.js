const { Router } = require('express');
const passport = require('passport');
const { requireNoAuth } = require('../middlewares/auth.middleware.js');
const { showSignupForm, processSignup, showFailedSignup } = require('../controllers/signup.controllers.js');

const router = Router();

router.get('/', requireNoAuth, showSignupForm);

router.post('/', requireNoAuth, passport.authenticate('signup'), processSignup);

router.get('/fail', showFailedSignup);

module.exports = router;