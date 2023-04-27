const passport = require('passport')
const local = require('passport-local')
const GitHubStrategy = require('passport-github2')
const { usersService } = require('../repositories/index.js')
const { createHash, isValidPassword } = require('../utils.js')

const CLIENTID = process.env.CLIENTID;
const CLIENTSECRET = process.env.CLIENTSECRET;
const CALLBACKURL = process.env.CALLBACKURL;

const localStrategy = local.Strategy;
const initializePassport = () => {

  passport.use('signup', new localStrategy(
    { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
      const { first_name, last_name, email, age } = req.body;

      try {
        let user = await usersService.getUserByEmail(username)
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
        let result = await usersService.createUser(newUser)
        return done(null, result);
      } catch (error) {
        return done('Error al obtener usuario: ' + error)
      }
    }))

  passport.use('login', new localStrategy(
    { passReqToCallback: true }, async (req, username, password, done) => {
      try {
        const user = await usersService.getUserByEmail(username)

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

  passport.use('github', new GitHubStrategy({
    clientID: CLIENTID,
    clientSecret: CLIENTSECRET,
    callbackURL: CALLBACKURL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile);
      // let user = await userModel.findOne({ email: profile._json.email })
      let user = await usersService.getUserByEmail(profile._json.email)
      if (!user) {
        let newUser = {
          first_name: profile._json.name,
          last_name: '',
          age: 18,
          email: profile._json.email,
          password: '',
        }
        let result = await usersService.createUser(newUser);
        console.log(result)
        done(null, result)
      } else {
        done(null, user)
      }
    } catch (error) {
      return done(error)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id) // quizas user._id
  });

  passport.deserializeUser(async (id, done) => {
    let user = await usersService.getUserById(id)
    done(null, user)
  })
}


module.exports = initializePassport;