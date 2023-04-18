const {messageModel} = require('../dao/mongo/models/messages.model.js');

const getAllMessages = async (req, res) => {
  try {
    let users = await messageModel.find()
    console.log(users)
    res.status(200).json(users)

} catch (err) {
    res.status(500).json({ error: err })
}
}

const getEmptyMessages = async (req, res) => {
  let messages = [];
  res.json(messages);
}

module.exports = {
  getAllMessages,
  getEmptyMessages,
}