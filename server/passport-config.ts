import { Strategy } from 'passport-local'
import bcrypt from 'bcrypt'

const initialize = (passport, getUserByUsername, getUserById) => {
  const authenticateUser = async (username, password, done) => {
    const user = await getUserByUsername({ username })
    if (user == null) {
      return done(null, false, { message: 'No user with that username' })
    }

    try {
      console.log(password, user)
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new Strategy({ usernameField: 'username' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById({ id }))
  })
}

export default initialize
