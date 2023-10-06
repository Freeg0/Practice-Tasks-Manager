import React, { useState } from 'react'
import useStore from '../../store/useTodosStore'

const CreateTodoForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const createTodos = useStore((state) => state.createTodos)

  const addTodos = () => {
    createTodos({ name: title, description })
    setTitle('')
    setDescription('')
  }

  return (
    <div>
      <input
        type="text"
        id="title"
        name="Title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        id="description"
        name="Description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addTodos}>Create Task</button>
    </div>
  )
}

export default CreateTodoForm
