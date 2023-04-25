const { Router } = require('express');
const passport = require('passport');
const { requireNoAuth } = require('../middlewares/auth.middleware.js');
const { showLoginForm, processLogin, showFailedLogin, loginWithGitHub, loginWithGitHubCallback } = require('../controllers/login.controllers.js');

const router = Router();

router.get('/', requireNoAuth, showLoginForm);


router.post('/', requireNoAuth, passport.authenticate('login', { failureRedirect: '/login/faillogin' }), processLogin);

router.get('/faillogin', showFailedLogin);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), loginWithGitHub);

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), loginWithGitHubCallback);



module.exports = router;