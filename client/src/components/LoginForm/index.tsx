import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/auth'

const LoginForm = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const error = useAuthStore((state) => state.error)
  const auth = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const success = await auth.login({ username, password })
      if (success) {
        navigate('/dashboard')
      } else {
        throw new Error(error)
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
    }
  }

  return (
    <div>
      {error ? <h4>{error}</h4> : <></>}
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Log In</button>
      <Link to="createUser">Create Account</Link>
    </div>
  )
}

export default LoginForm
