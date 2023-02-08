const mongoose = require('mongoose')

const messageCollection = 'messages'

const messageSchema = mongoose.Schema({
    user: { type: String, unique: true},
    message: String
});

const messageModel = mongoose.model(messageCollection, messageSchema)

module.exports = {
    messageModel
}