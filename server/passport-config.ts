import Local from 'passport-local'
import crypto from 'crypto'

export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.password === inputHash
  return passwordsMatch
}

const initialize = (passport, getUserByUsername, getUserById) => {
  const authenticateUser = async (username, password, done) => {
    const user = await getUserByUsername({ username })
    if (user == null) {
      return done(new Error('Invalid username and password combination'))
    }

    try {
      if (validatePassword(user, password)) {
        return done(null, user)
      } else {
        return done(new Error('Invalid username and password combination'))
      }
    } catch (e) {
      return done(new Error(e))
    }
  }

  passport.use(new Local.Strategy(authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById({ id }))
  })
}

export default initialize
