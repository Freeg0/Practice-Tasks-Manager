import { getLoginSession } from './setSession'
import { getUserByUsername } from '../users/getUser'

export const user = (pool) => async (req, res) => {
  try {
    const session = await getLoginSession(req)
    const user = (session && (await getUserByUsername(pool)(session))) ?? null

    res.status(200).json({ user })
  } catch (error) {
    res.status(500).end('Authentication token is invalid, please log in')
  }
}
