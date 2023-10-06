import { Pool } from 'pg'

export const getUserByUsername =
  (pool: Pool) =>
  async ({ username }: { username: string }) => {
    try {
      const response = await pool.query(
        `SELECT * FROM users WHERE username = '${username}';`
      )

      return response.rows[0]
    } catch (error) {
      console.error('Error get user:', error)
    }
  }

export const getUserById =
  (pool: Pool) =>
  async ({ id }: { id: string }) => {
    try {
      const response = await pool.query(`SELECT * FROM users WHERE id = ${id};`)

      return response.rows[0]
    } catch (error) {
      console.error('Error get user:', error)
    }
  }
