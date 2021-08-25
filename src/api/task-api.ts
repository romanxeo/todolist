import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': 'd683f2e5-a7af-46f3-9fb7-3906f227c671'
  }
})

type ResponseType<T = {}> = {
  resultCode: number
  messages: Array<string>
  data: T
}

type TaskType= {
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

type UpdateTaskModelType = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}

type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export const taskAPI = {
  GetTasks(todolistId: string) {
    const promise = instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    return promise
  },

  CreateTask(todolistId: string, title: string) {
    const promise = instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: title})
    return promise
  },

  DeleteTask(todolistId: string, taskId: string) {
    const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    return promise
  },

  UpdateTaskTitle(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    const promise = instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    return promise
  },
}