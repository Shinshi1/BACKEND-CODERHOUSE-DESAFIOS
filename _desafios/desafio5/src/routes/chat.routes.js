const express = require('express')
const chatRouter = express.Router()

chatRouter.get('/', (req, res) => {
    res.render('chat', { stylesheet: 'chat' })
})

module.exports = {
    chatRouter
}