const express = require('express')
const { showChatPage } = require('../controllers/chat.controllers.js')
const chatRouter = express.Router()

chatRouter.get('/', showChatPage)

module.exports = {
    chatRouter
}