import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': 'd683f2e5-a7af-46f3-9fb7-3906f227c671'
  }
})

type TaskType= {
  id: string
  addedDate: string
  order: number
  title: string
}

type CommonResponseType<T = {}> = {
  data: T
  fieldsErrors: Array<string>
  messages: Array<string>
  resultCode: number
}

export const taskAPI = {
  GetTasks(todolistId: string) {
    const promise = instance.get(`todo-lists/${todolistId}/tasks`)
    return promise
  },

  CreateTask(todolistId: string, title: string) {
    const promise = instance.post(`todo-lists/${todolistId}/tasks`, {title: title})
    return promise
  },

  DeleteTask(todolistId: string, taskId: string) {
    const promise = instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    return promise
  },

  UpdateTaskTitle(todolistId: string, taskId: string, title: string) {
    const promise = instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
    return promise
  },
}