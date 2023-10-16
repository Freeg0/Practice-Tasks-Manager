import { create } from 'zustand'
import axios from 'axios'

export interface Task {
  id: number
  name: string
  description: string
  state: string
}

type Store = {
  tasks: Task[]
  isLoading: boolean
  error: null
  onLoad: () => void
  createTasks: (createTasksParams: {
    name: string
    description: string
  }) => void
  deleteTasks: (taskToDelete: { id: number }) => void
}

const useTasksStore = create<Store>(
  (set, get): Store => ({
    tasks: [],
    isLoading: false,
    error: null,
    onLoad: async () => {
      try {
        set((state) => ({ ...state, isLoading: true }))
        const response = await axios.get('http://localhost:3000/tasks')
        set((state) => ({ ...state, isLoading: false, tasks: response.data }))
      } catch (err: any) {
        set((state) => ({ ...state, error: err.message, isLoading: false }))
      }
    },
    createTasks: async ({
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
          ...get().tasks,
          { id: response?.data.id, name, description, state: 'todo' },
        ]
        set((state) => ({ ...state, isLoading: false, tasks: updatedData }))
      } catch (err: any) {
        set((state) => ({ ...state, error: err.message, isLoading: false }))
      }
    },
    deleteTasks: async ({ id }: { id: number }) => {
      try {
        console.log(id)
        set((state) => ({ ...state, isLoading: true }))
        await axios.delete(`http://localhost:3000/task/${id}`)
        const updatedData = get().tasks.filter((task) => task.id !== id)
        set((state) => ({ ...state, isLoading: false, tasks: updatedData }))
      } catch (err: any) {
        console.log(err)
        set((state) => ({ ...state, error: err.message, isLoading: false }))
      }
    },
  })
)

export default useTasksStore
