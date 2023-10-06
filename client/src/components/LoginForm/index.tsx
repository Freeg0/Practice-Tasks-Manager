import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'

const LoginForm = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const auth = useAuth()

  return (
    <div>
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
      <button
        onClick={() => {
          auth.login({ username, password })
        }}
      >
        Log In
      </button>
      <Link to="createUser">Create Account</Link>
    </div>
  )
}

export default LoginForm
