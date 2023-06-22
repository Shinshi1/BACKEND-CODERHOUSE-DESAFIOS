const showAdministrationPage = (req, res) => {
  res.render('administration', { title: 'administration', stylesheet: 'administration' })
}

module.exports = {
  showAdministrationPage
}