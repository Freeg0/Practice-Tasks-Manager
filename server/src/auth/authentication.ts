import passport from 'passport'
import { setLoginSession } from './setSession'

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

export const loginUser = async (req, res) => {
  try {
    const user = await authenticate('local', req, res)
    // session is the payload to save in the token, it may contain basic info about the user
    const session = { ...user }

    const token = await setLoginSession(res, session)

    res.status(200).send({ done: true, token })
  } catch (error) {
    console.error(error)
    res.status(401).send(error.message)
  }
}
