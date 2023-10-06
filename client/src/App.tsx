import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import CreateUserForm from './components/CreateUserForm'
import Dashboard from './components/DashBoard'
import { AuthProvider } from './context/auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />,
  },
  {
    path: '/createUser',
    element: <CreateUserForm />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
])

const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
