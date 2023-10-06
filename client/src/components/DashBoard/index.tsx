import React from 'react'
import TodoList from '../TodoList'
import CreateTodoForm from '../CreateTodoForm'

const Dashboard = () => {
  return (
    <>
      <h1>Bonjour sur mon task management</h1>
      <CreateTodoForm />
      <TodoList />
    </>
  )
}

export default Dashboard
