const passport = require('passport')
const local = require('passport-local')
const userModel = require('../dao/models/users.model.js');
const { createHash, isValidPassword } = require('../utils.js')

const localStrategy = local.Strategy;
const initializePassport = () => {
  passport.use('signup', new localStrategy(
    { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
      const { first_name, last_name, email, age } = req.body;

      try {
        let user = await userModel.findOne({ email: username });
        if (user) {
          console.log('User alredy exists')
          return done(null, false, { message: 'User alredy exists' })
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

  console.log('Passport: Running strategy...');
  passport.use('login', new localStrategy(
    { passReqToCallback: true, usernameField: 'email' }, async (username, password, done) => {
      console.log('Passport: Initializing strategy...');
      try {
        const user = await userModel.findOne({ email: username })
        if (!user) {
          console.log("User doesn't exist")
          return done(null, false, { message: "User doesn't exist" })
        }
        if (!isValidPassword(password, user.password)) return done(null, false); //posible error aqui
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }))

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user)
  })
}


module.exports = initializePassport;