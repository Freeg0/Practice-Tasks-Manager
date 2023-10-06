import { create } from 'zustand'
import axios from 'axios'

type Store = {
  username: string
  error: string
  createUser: (createUsersParams: {
    username: string
    password: string
  }) => Promise<boolean>
}

const useUsersStore = create<Store>(
  (set, get): Store => ({
    username: '',
    error: '',
    createUser: async ({
      username,
      password,
    }: {
      username: string
      password: string
    }): Promise<boolean> => {
      try {
        set((state) => ({ ...state, isLoading: true }))
        const response = await axios.post('http://localhost:3000/user', {
          username,
          password,
        })
        set((state) => ({ ...state, username, isLoading: false }))
        return true
      } catch (err: any) {
        set((state) => ({ ...state, error: err.message, isLoading: false }))
        return false
      }
    },
  })
)

export default useUsersStore
