import { Pool } from 'pg'
import { Request, Response } from 'express'

const createTask =
  (pool: Pool) => async (request: Request, response: Response) => {
    try {
      const { name, description } = request.body

      const result = await pool.query(
        `INSERT INTO tasks (name, description)
       VALUES ($1, $2) RETURNING id;`,
        [name, description]
      )

      // Send a success response with a status code of 201 (Created)
      response
        .status(201)
        .json({ id: result.rows[0].id, message: 'Task created successfully' })
    } catch (error) {
      console.error('Error creating task:', error)
      // Handle the error and send an appropriate response
      response.status(500).json({ error: 'Internal server error' })
    }
  }

export default createTask
