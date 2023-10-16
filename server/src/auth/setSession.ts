import { config } from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  config()
}
import Iron from '@hapi/iron'

const TOKEN_SECRET = process.env.TOKEN_SECRET
const MAX_AGE = 60 * 60 * 8 // 8 hours

export async function setLoginSession(res, session) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

  return token
}

export async function getLoginSession(req) {
  // Get authorization bearer token from headers
  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    throw new Error('Authentication token is invalid, please log in')
  }

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session
}
