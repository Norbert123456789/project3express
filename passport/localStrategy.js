const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
  { usernameField: 'email' },
  function(email, password, done) {
    User.findOne({ email: email }, (err, user) => {
      if (err) return done(err)
      if (!user) return done(null, false, { message: 'Incorrect credentials' })
      if(!user.checkPassword(password)) return done(null, false, { message: 'Invalid credentials' })
      return done(null, user)
    })
  }
)

module.exports = strategy