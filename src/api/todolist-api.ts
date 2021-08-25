import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': 'd683f2e5-a7af-46f3-9fb7-3906f227c671'
  }
})

type TodolistType= {
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

export const todolistAPI = {
  GetTodolists() {
    const promise = instance.get<Array<TodolistType>>('todo-lists')
    return promise
  },

  CreateTodolist(title: string) {
    const promise = instance.post<CommonResponseType<{item: TodolistType}>>('todo-lists', {title: title})
    return promise
  },

  DeleteTodolist(todolistId: string) {
    const promise = instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    return promise
  },

  UpdateTodolistTitle(todolistId: string, title: string) {
    const promise = instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title: title})
    return promise
  },
}