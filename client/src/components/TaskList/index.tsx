import React, { useEffect } from 'react'
import useTaskStore from '../../store/useTaskStore'

const TodoList = () => {
  const tasks = useTaskStore((state) => state.tasks)
  const onLoad = useTaskStore((state) => state.onLoad)
  const deleteTask = useTaskStore((state) => state.deleteTasks)

  useEffect(() => {
    onLoad()
  }, [onLoad])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.state}</td>
              <td>
                <button onClick={() => deleteTask({ id: task.id })}>
                  Delete Task
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoList
