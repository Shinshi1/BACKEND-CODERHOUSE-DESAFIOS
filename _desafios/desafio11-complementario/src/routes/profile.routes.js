const { Router } = require('express')
const { getProfileInfo, userLogout, getTickets } = require('../controllers/profile.controllers.js')
const { requireAuth } = require('../middlewares/auth.middleware.js');

const router = Router();


router.get('/', requireAuth, getProfileInfo);

router.get('/logout', requireAuth, userLogout);

router.get('/tickets', requireAuth, getTickets)

module.exports = router;