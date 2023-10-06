import { Client } from 'pg'

const client = new Client()

export default async () => {
  await client.connect()

  const createEnumStatus = `CREATE TYPE status AS ENUM ('todo','done', 'inprogress');`

  const createTaskTable = `CREATE TABLE tasks (
  id INTEGER PRIMARY KEY,
  name VARCHAR ( 50 ) NOT NULL,
  description VARCHAR ( 50 ) NOT NULL,
  state status DEFAULT 'todo'
);`

  try {
    await client.query(createEnumStatus)
    await client.query(createTaskTable)
  } catch (err) {
    console.error(err)
  } finally {
    await client.end()
  }
}
