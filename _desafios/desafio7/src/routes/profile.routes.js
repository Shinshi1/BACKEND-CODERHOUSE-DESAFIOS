const { Router } = require('express')
const {getProfileInfo, userLogout} = require('../controllers/profile.controllers.js')
const { requireAuth } = require('../middlewares.js');

const router = Router();


router.get('/', requireAuth, getProfileInfo);

router.get('/logout', requireAuth, userLogout);

module.exports = router;