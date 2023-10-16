import { create } from 'zustand'
import axios from 'axios'

type Store = {
  username: string
  token: string
  error: string
  loginUser: (loginUsersParams: {
    username: string
    password: string
  }) => Promise<string>
  logoutUser: () => void
  isAuth: (token: { token: string }) => void
}

const useAuthStore = create<Store>(
  (set): Store => ({
    username: '',
    token: '',
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
        const { data } = await axios.post('http://localhost:3000/login', {
          username,
          password,
        })
        set((state) => ({
          ...state,
          token: data.token,
          error: '',
          username,
          isLoading: false,
        }))
        return data.token
      } catch (err: any) {
        set((state) => ({
          ...state,
          error: err.message,
          isLoading: false,
        }))
      }
    },
    logoutUser: async () => {
      try {
        set((state) => ({ ...state, isLoading: true }))
        await axios.post('http://localhost:3000/logout')
        set((state) => ({
          ...state,
          username: '',
          token: '',
          isLoading: false,
        }))
      } catch (err: any) {
        set((state) => ({
          ...state,
          username: '',
          token: '',
          error: err.message,
          isLoading: false,
        }))
      }
    },
    isAuth: async ({ token }) => {
      try {
        set((state) => ({ ...state, isLoading: true }))
        const { data } = await axios.get('http://localhost:3000/isAuth', {
          headers: {
            authorization: `bearer ${token}`,
          },
        })
        set((state) => ({
          ...state,
          username: data.user.username,
          isLoading: false,
        }))
      } catch (err: any) {
        set((state) => ({ ...state, error: err.message, isLoading: false }))
      }
    },
  })
)

export default useAuthStore
