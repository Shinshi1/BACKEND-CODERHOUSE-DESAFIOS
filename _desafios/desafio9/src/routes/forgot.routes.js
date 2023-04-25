const { Router } = require('express')
const {forgotPageController, resetPasswordController} = require('../controllers/forgot.controller.js')
const { requireNoAuth } = require('../middlewares/auth.middleware.js');

const router = Router();

router.get('/', requireNoAuth, forgotPageController)

router.post('/', requireNoAuth, resetPasswordController)

module.exports = router