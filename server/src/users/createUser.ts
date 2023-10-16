import { Pool } from 'pg'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const createUser =
  (pool: Pool) => async (request: Request, response: Response) => {
    try {
      const { username, password } = request.body

      // const hashedPassword = await bcrypt.hash(password, 10)
      const salt = crypto.randomBytes(16).toString('hex')
      const hashedPassword = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex')

      await pool.query(
        `INSERT INTO users (username, password, salt)
       VALUES ($1, $2, $3) RETURNING id;`,
        [username, hashedPassword, salt]
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
