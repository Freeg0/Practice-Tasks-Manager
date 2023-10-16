import React from 'react'
import TaskList from '../TaskList'
import CreateTaskForm from '../CreateTaskForm'
import RequireAuth from '../RequireAuth'
import { useAuthContext } from '../../context/auth'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const auth = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const success = await auth.logout()
      if (success) {
        navigate('/')
      } else {
        throw new Error(error)
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
    }
  }

  return (
    <RequireAuth>
      <h1>Hello in my task management</h1>
      <h1>Connect as {auth.username}</h1>
      <button onClick={handleSubmit}>Log Out</button>
      <CreateTaskForm />
      <TaskList />
    </RequireAuth>
  )
}

export default Dashboard
