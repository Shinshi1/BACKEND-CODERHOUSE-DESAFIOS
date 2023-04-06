const { Router } = require("express");
const { messageModel } = require("../dao/models/messages.model");

const messageRoute = Router();

messageRoute.get('/', async (req, res) => {
    try {
        let users = await messageModel.find()
        console.log(users)
        res.status(200).json(users)

    } catch (err) {
        res.status(500).json({ error: err })
    }
})

messageRoute.get('/', (req, res) => {
    let messages = [];
    res.json(messages);
});

module.exports = {
    messageRoute
} 