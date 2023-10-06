import React, { useContext, useState, createContext } from 'react'
import useStore from '../store/useAuthStore'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const username = useStore((state) => state.username)
  const isAuth = useStore((state) => state.isAuth)
  const loginUser = useStore((state) => state.loginUser)
  const logoutUser = useStore((state) => state.logoutUser)

  const login = ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    loginUser({ username, password })
  }

  const logout = () => {
    logoutUser()
  }

  return (
    <AuthContext.Provider value={{ username, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
