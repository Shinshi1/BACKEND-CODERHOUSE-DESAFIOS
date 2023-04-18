const { Router } = require("express");
const { getAllMessages, getEmptyMessages } = require("../controllers/message.controllers.js");

const messageRoute = Router();

messageRoute.get('/', getAllMessages)

messageRoute.get('/', getEmptyMessages);

module.exports = {
    messageRoute
} 