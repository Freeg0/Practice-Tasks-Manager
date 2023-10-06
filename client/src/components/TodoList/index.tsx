import React, { useEffect } from 'react'
import useStore from '../../store/useTodosStore'

const TodoList = () => {
  const tasks = useStore((state) => state.todos)
  const onLoad = useStore((state) => state.onLoad)
  const deleteTask = useStore((state) => state.deleteTodos)

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
          {tasks.map((todo, index) => (
            <tr key={index}>
              <td>{todo.id}</td>
              <td>{todo.name}</td>
              <td>{todo.description}</td>
              <td>{todo.state}</td>
              <td>
                <button onClick={() => deleteTask({ id: todo.id })}>
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
