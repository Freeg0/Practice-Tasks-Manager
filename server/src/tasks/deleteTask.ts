import { Pool } from 'pg'
import { Request, Response } from 'express'

const deleteTask =
  (pool: Pool) => async (request: Request, response: Response) => {
    try {
      const { id } = request.params

      await pool.query(
        `DELETE FROM tasks
        WHERE id = ${id};`
      )

      // Send a success response with a status code of 201 (Created)
      response.status(201).json({ message: 'Task deleted successfully' })
    } catch (error) {
      console.error('Error deleting task:', error)
      // Handle the error and send an appropriate response
      response.status(500).json({ error: 'Internal server error' })
    }
  }

export default deleteTask
