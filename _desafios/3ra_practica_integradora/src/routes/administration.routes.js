const express = require('express');
const { showAdministrationPage } = require('../controllers/administration.controllers.js')

const router = express.Router();

router.get('/', showAdministrationPage);

module.exports = router