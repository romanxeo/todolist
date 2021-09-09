import axios from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'd683f2e5-a7af-46f3-9fb7-3906f227c671'
  }
})

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  data: D
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
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

export const todolistsAPI = {
  getTodolists() {
    const promise = instance.get<TodolistType[]>('todo-lists');
    return promise;
  },
  createTodolist(title: string) {
    const promise = instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title});
    return promise;
  },
  deleteTodolist(todolistId: string) {
    const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    return promise;
  },
  updateTodolist(todolistId: string, title: string) {
    const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title});
    return promise;
  },

  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, taskTitle: string) {
    return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle});
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  }
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

export type myData = {
  id: number
  email: string
  login: string
}

export const authAPI = {
  login(payload: LoginParamsType) {
    return instance.post<ResponseType<{userId: number}>>(`auth/login`, payload);
  },
  me() {
    return instance.get<ResponseType<myData>>(`auth/me`)
  }
}
