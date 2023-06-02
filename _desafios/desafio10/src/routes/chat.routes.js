const express = require('express')
const { showChatPage } = require('../controllers/chat.controllers.js')
const { isUser } = require('../middlewares/auth.middleware.js')
const chatRouter = express.Router()

chatRouter.get('/', isUser, showChatPage)

module.exports = {
    chatRouter
}