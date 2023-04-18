const bcrypt = require('bcrypt')

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (password, userPassword) => bcrypt.compareSync(password, userPassword);



module.exports = {
  createHash,
  isValidPassword,
}

