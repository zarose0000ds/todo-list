const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  // INITIALIZE
  app.use(passport.initialize())
  app.use(passport.session())

  // STRATEGY
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email }).then(user => {
      if (!user) {
        return done(null, false, { message: 'That email is not registered!' })
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Email or Password incorrect.' })
      }
      return done(null, user)
    }).catch(e => done(e, false))
  }))

  // SERIALIZE
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // DESERIALIZE
  passport.deserializeUser((id, done) => {
    User.findById(id).lean().then(user => done(null, user)).catch(e => done(e, null))
  })
}