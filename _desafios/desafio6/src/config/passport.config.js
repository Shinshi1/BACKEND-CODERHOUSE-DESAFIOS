const passport = require('passport')
const local = require('passport-local')
const GitHubStrategy = require('passport-github2')
const userModel = require('../dao/models/users.model.js');
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

  passport.use('login', new localStrategy(
    { passReqToCallback: true }, async (req, username, password, done) => {
      try {
        const user = await userModel.findOne({ email: username })
        if (!user) {
          console.log("User doesn't exist")
          return done(null, false, { message: "User doesn't exist" })
        }
        if (!isValidPassword(password, user.password)) return done(null, false);
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
      let user = await userModel.findOne({ email: profile._json.email })
      if (!user) {
        let newUser = {
          first_name: profile._json.name ? profile._json.name : '',
          last_name: '',
          age: 18,
          email: profile._json.email,
          password: '',
        }
        let result = await userModel.create(newUser);
        done(null, result)
      } else {
        done(null, user)
      }
    } catch (error) {
      return done(error)
    }
  }))

  passport.serializeUser((user, done) => {
    console.log('passport.serializeUser', user)
    done(null, user.id) // quizas user._id
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user)
  })
}


module.exports = initializePassport;