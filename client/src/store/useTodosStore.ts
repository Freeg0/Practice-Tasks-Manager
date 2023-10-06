import { create } from 'zustand'
import axios from 'axios'

export interface Todo {
  id: number
  name: string
  description: string
  state: string
}

type Store = {
  todos: Todo[]
  isLoading: boolean
  error: null
  onLoad: () => void
  createTodos: (createTodosParams: {
    name: string
    description: string
  }) => void
  deleteTodos: (todoToDelete: { id: number }) => void
}

const useTodosStore = create<Store>(
  (set, get): Store => ({
    todos: [],
    isLoading: false,
    error: null,
    onLoad: async () => {
      try {
        set((state) => ({ ...state, isLoading: true }))
        const response = await axios.get('http://localhost:3000/tasks')
        set((state) => ({ ...state, isLoading: false, todos: response.data }))
      } catch (err: any) {
        set((state) => ({ ...state, error: err.message, isLoading: false }))
      }
    },
    createTodos: async ({
      name,
      description,
    }: {
      name: string
      description: string
    }) => {
      try {
        set((state) => ({ ...state, isLoading: true }))
        const response = await axios.post('http://localhost:3000/task', {
          name,
          description,
        })
        const updatedData = [
          ...get().todos,
          { id: response?.data.id, name, description, state: 'todo' },
        ]
        set((state) => ({ ...state, isLoading: false, todos: updatedData }))
      } catch (err: any) {
        set((state) => ({ ...state, error: err.message, isLoading: false }))
      }
    },
    deleteTodos: async ({ id }: { id: number }) => {
      try {
        console.log(id)
        set((state) => ({ ...state, isLoading: true }))
        await axios.delete(`http://localhost:3000/task/${id}`)
        const updatedData = get().todos.filter((todo) => todo.id !== id)
        set((state) => ({ ...state, isLoading: false, todos: updatedData }))
      } catch (err: any) {
        console.log(err)
        set((state) => ({ ...state, error: err.message, isLoading: false }))
      }
    },
  })
)

export default useTodosStore
