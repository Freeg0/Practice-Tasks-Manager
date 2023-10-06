import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useStore from '../../store/useUserStore'

const CreateUserForm = () => {
  const navigate = useNavigate()
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const createUser = useStore((state) => state.createUser)

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
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        onClick={async () => {
          if (password === confirmPassword) {
            ;(await createUser({ username, password }))
              ? navigate('/')
              : setError('Error during create user')
          } else {
            setError('Not same confirm password')
          }
        }}
      >
        Create User
      </button>
      <Link to="/">Log In</Link>
    </div>
  )
}

export default CreateUserForm
