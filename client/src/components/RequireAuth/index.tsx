import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../context/auth'

const RequireAuth = ({ children }) => {
  const auth = useAuthContext()

  if (!auth.username) {
    return <Navigate to="/" />
  }

  return <div>{children}</div>
}

export default RequireAuth
