const passport = require('passport')
const local = require('passport-local')
const userModel = require('../dao/models/users.model.js');
const { createHash, isValidPassword } = require('../utils.js')

const localStrategy = local.Strategy;
const initializePassport = () => {
  passport.use('sigunp', new localStrategy(
    { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
      const { first_name, last_name, email, age } = req.body;

      try {
        let user = await userModel.findOne({ email: username });
        if (user) {
          console.log('User alredy exists')
          return done(null, false)
        }
        const newUser = {
          first_name,
          last_name,
          email,
          password: createHash(password),
          age,
        }
        let result = await userModel.create(newUser)
        return done(null, result);
      } catch (error) {
        return done('Error al obtener usuario: ' + error)
      }
    }))
}

module.exports = initializePassport;