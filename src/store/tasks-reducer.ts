import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export type removeTaskAT = {
  type: "REMOVE-TASK"
  taskID: string
  todoListID: string
}

export type addTaskAT = {
  type: "ADD-TASK"
  todoListID: string
  title: string
}

export type changeTaskStatusAT = {
  type: "CHANGE-TASK-STATUS"
  taskID: string
  isDoneStatus: boolean
  todoListID: string
}

export type changeTitleTaskAT = {
  type: "CHANGE-TITLE-TASK",
  todoListID: string,
  taskID: string,
  title: string
}

export type actionsType =
  removeTaskAT
  | addTaskAT
  | changeTaskStatusAT
  | changeTitleTaskAT
  | AddTodoListAT
  | RemoveTodoListAT

const initialState: TasksStateType = {}

type initialStateType = typeof initialState

export const tasksReducer = (state: TasksStateType = initialState, action: actionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      let copyState = {...state}
      copyState[action.todoListID] = copyState[action.todoListID].filter(t => t.id !== action.taskID);
      return copyState
    }
    case "ADD-TASK": {
      let copyState = {...state}
      const newTask = {id: v1(), title: action.title, isDone: false};
      copyState[action.todoListID] = [newTask, ...copyState[action.todoListID]]
      return copyState
    }
    case "CHANGE-TASK-STATUS": {
      let todolistTasks = state[action.todoListID]
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskID ? {
          ...t,
          isDone: action.isDoneStatus
        } : t)
      state[action.todoListID] = newTasksArray
      return ({...state})
    }
    case "CHANGE-TITLE-TASK": {
      let todolistTasks = state[action.todoListID]
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskID ? {
          ...t,
          title: action.title
        } : t)
      state[action.todoListID] = newTasksArray
      return ({...state})
    }
    case "ADD-TODOLIST": {
      let copyState = {...state, [action.todoListID]: []}
      return copyState
    }
    case "REMOVE-TODOLIST": {
      let copyState = {...state}
      delete copyState[action.todoListID]
      return copyState
    }
    default:
      return state
  }
}

export const addTaskAC = (todoListID: string, title: string): addTaskAT => {
  return {
    type: "ADD-TASK",
    todoListID: todoListID,
    title: title
  }
}

export const removeTaskAC = (taskID: string, todoListID: string): removeTaskAT => {
  return {
    type: 'REMOVE-TASK',
    taskID: taskID,
    todoListID: todoListID
  }
}

export const changeTaskStatusAC = (taskID: string, isDoneStatus: boolean, todoListID: string): changeTaskStatusAT => {
  return {
    type: "CHANGE-TASK-STATUS",
    taskID: taskID,
    isDoneStatus: isDoneStatus,
    todoListID: todoListID
  }
}

export const changeTitleTaskAC = (todoListID: string, taskID: string, title: string): changeTitleTaskAT => {
  return {
    type: "CHANGE-TITLE-TASK",
    todoListID: todoListID,
    taskID: taskID,
    title: title
  }
}






