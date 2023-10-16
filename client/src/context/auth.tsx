import React, { useContext, createContext } from 'react'
import useAuthStore from '../store/useAuthStore'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const username = useAuthStore((state) => state.username)
  const loginUser = useAuthStore((state) => state.loginUser)
  const logoutUser = useAuthStore((state) => state.logoutUser)
  const isAuthUser = useAuthStore((state) => state.isAuth)

  const login = async ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    const token = await loginUser({ username, password })
    localStorage.setItem('accessToken', token)
    return true
  }

  const logout = async () => {
    await logoutUser()
    localStorage.removeItem('accessToken')
    return true
  }

  const isAuth = async () => {
    const token = localStorage.getItem('accessToken')
    await isAuthUser({ token })
  }

  return (
    <AuthContext.Provider value={{ username, login, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
