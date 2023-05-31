const { Router } = require('express')
const {forgotPageController, resetPasswordController, resetPasswordEmailController, resetPasswordCreateController, resetPasswordPageController} = require('../controllers/forgot.controller.js')
const { requireNoAuth } = require('../middlewares/auth.middleware.js');

const router = Router();

router.get('/', requireNoAuth, forgotPageController)

router.post('/:key', requireNoAuth, resetPasswordEmailController)

router.get('/:key', requireNoAuth, resetPasswordPageController)

router.post('/create/:key', requireNoAuth, resetPasswordCreateController)

router.post('/', requireNoAuth, resetPasswordController)

module.exports = router