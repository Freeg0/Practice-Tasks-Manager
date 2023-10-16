import React, { useState } from 'react'
import useTaskStore from '../../store/useTaskStore'

const CreateTaskForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const createTasks = useTaskStore((state) => state.createTasks)

  const addTasks = () => {
    createTasks({ name: title, description })
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
      <button onClick={addTasks}>Create Task</button>
    </div>
  )
}

export default CreateTaskForm
