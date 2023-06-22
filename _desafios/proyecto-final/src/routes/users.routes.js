const { Router } = require('express');
const { changeRole } = require('../controllers/users.controllers.js')

const router = Router();

router.put('/premium/:uid', changeRole)

module.exports = router;