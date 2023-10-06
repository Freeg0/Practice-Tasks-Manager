import { Pool } from 'pg'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

const createUser =
  (pool: Pool) => async (request: Request, response: Response) => {
    try {
      const { username, password } = request.body

      const hashedPassword = await bcrypt.hash(password, 10)

      await pool.query(
        `INSERT INTO users (username, password)
       VALUES ($1, $2) RETURNING id;`,
        [username, hashedPassword]
      )

      // Send a success response with a status code of 201 (Created)
      response.status(201).json({ message: 'User created successfully' })
    } catch (error) {
      console.error('Error creating user:', error)
      // Handle the error and send an appropriate response
      response.status(500).json({ error: 'Internal server error' })
    }
  }

export default createUser
