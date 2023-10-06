import { Pool } from 'pg'
import { Request, Response } from 'express'

const getTasks = (pool: Pool) => (_: Request, response: Response) => {
  pool.query('SELECT * FROM tasks ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export default getTasks
