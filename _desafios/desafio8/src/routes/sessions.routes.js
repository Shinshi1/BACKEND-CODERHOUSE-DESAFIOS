const { Router } = require('express')
const {getCurrentUser} = require('../controllers/sessions.controllers.js')

const router = Router();

router.get('/', getCurrentUser)  //esta es mi ruta `/current`

module.exports = router