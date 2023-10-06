import { create } from 'zustand'
import axios from 'axios'

type Store = {
  username: string
  error: string
  isAuth: boolean
  loginUser: (loginUsersParams: { username: string; password: string }) => void
  logoutUser: () => void
}

const useAuthStore = create<Store>(
  (set, get): Store => ({
    username: '',
    isAuth: false,
    error: '',
    loginUser: async ({
      username,
      password,
    }: {
      username: string
      password: string
    }) => {
      try {
        set((state) => ({ ...state, isLoading: true }))
        await axios.post('http://localhost:3000/login', {
          username,
          password,
        })
        set((state) => ({ ...state, username, isAuth: true, isLoading: false }))
      } catch (err: any) {
        set((state) => ({ ...state, error: err.message, isLoading: false }))
      }
    },
    logoutUser: async () => {
      try {
        set((state) => ({ ...state, isLoading: true }))
        await axios.delete('http://localhost:3000/logout')
        set((state) => ({
          ...state,
          username: '',
          isAuth: false,
          isLoading: false,
        }))
      } catch (err: any) {
        set((state) => ({ ...state, error: err.message, isLoading: false }))
      }
    },
  })
)

export default useAuthStore
