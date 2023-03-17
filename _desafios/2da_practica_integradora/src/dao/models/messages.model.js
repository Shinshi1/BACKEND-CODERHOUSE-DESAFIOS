const mongoose = require('mongoose')

const schemaOptions = {
    versionKey: false
};

const messageCollection = 'messages'


const messageSchema = mongoose.Schema({
    user: { type: String, unique: true },
    message: String
}, schemaOptions);

const messageModel = mongoose.model(messageCollection, messageSchema)

module.exports = {
    messageModel
}