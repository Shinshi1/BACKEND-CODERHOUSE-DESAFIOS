const showChatPage = async (req, res) => {
  res.render('chat', { stylesheet: 'chat' })
};

module.exports = {
  showChatPage
}