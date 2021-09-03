import {TasksStateType} from '../App';
import {
  AddTodolistAT,
  RemoveTodolistAT,
  SetTodolistsAT
} from './todolists-reducer';
import {
  TaskStatuses,
  TaskType,
  todolistsAPI, TodolistType,
} from '../api/todolist-api'
import {Dispatch} from 'redux';
import {AppRootStateType} from "./store";
import {
  setAppErrorAT,
  setLoadingStatusAC,
  setLoadingStatusAT,
  actionAppType, setAppErrorAC
} from "./app-reducer";
import {AxiosError} from "axios";
import {
  handleServerAppError,
  handleServerNetworkError
} from "../utils/error-utils";


export const addTaskAC = (task: TaskType) => {
  return {
    type: "ADD-TASK",
    task: task
  } as const
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: 'REMOVE-TASK',
    todolistId: todolistId,
    taskId: taskId
  } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
  return {
    type: "CHANGE-TASK-STATUS",
    todolistId: todolistId,
    taskId: taskId,
    status: status,
  } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
  return {
    type: "CHANGE-TASK-TITLE",
    todolistId: todolistId,
    taskId: taskId,
    title: title
  } as const
}

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
  return {
    type: 'SET-TASKS',
    todolistId,
    tasks
  } as const
}


export type addTaskAT = ReturnType<typeof addTaskAC>
export type removeTaskAT = ReturnType<typeof removeTaskAC>
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type setTasksAT = ReturnType<typeof setTasksAC>

export type actionsType = addTaskAT
  | removeTaskAT
  | changeTaskStatusAT
  | changeTaskTitleAT
  | AddTodolistAT
  | RemoveTodolistAT
  | SetTodolistsAT
  | setTasksAT
  | setLoadingStatusAT
  | setAppErrorAT

const initialState: TasksStateType = {
  /*"todolistId1": [
      { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ],
  "todolistId2": [
      { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ]*/

}

/*
type initialStateType = typeof initialState
*/

export const tasksReducer = (state: TasksStateType = initialState, action: actionsType): TasksStateType => {
  switch (action.type) {

    case "ADD-TASK": {
      const stateCopy = {...state}
      const tasks = stateCopy[action.task.todoListId];
      const newTasks = [action.task, ...tasks];
      stateCopy[action.task.todoListId] = newTasks;
      return stateCopy;
    }

    case "REMOVE-TASK": {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todolistId];
      const newTasks = tasks.filter(t => t.id !== action.taskId);
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }

    case "CHANGE-TASK-STATUS": {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

      state[action.todolistId] = newTasksArray;
      return ({...state});
    }

    case "CHANGE-TASK-TITLE": {
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

      state[action.todolistId] = newTasksArray;
      return ({...state});
    }

    case "TODOLIST/ADD-TODOLIST": {
      return {
        ...state,
        [action.todolist.id]: []
      }
    }

    case "TODOLIST/REMOVE-TODOLIST": {
      const copyState = {...state};
      delete copyState[action.todolistId];
      return copyState;
    }

    case 'TODOLIST/SET-TODOLISTS': {
      const stateCopy = {...state}
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = []
      })
      return stateCopy;
    }

    case 'SET-TASKS': {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = action.tasks
      return stateCopy
    }

    default:
      return state
  }
}

//THUNK

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch<actionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
      .then((res) => {
        const tasks = res.data.items
        const action = setTasksAC(todolistId, tasks)
        dispatch(action)
        dispatch(setLoadingStatusAC('idle'))
      })
      .catch(err => {
        handleServerNetworkError(dispatch, err)
      })
  }
}

export const addTaskTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch<actionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(addTaskAC(res.data.data.item))
          dispatch(setLoadingStatusAC('idle'))
        } else {
          handleServerAppError<{ item: TaskType }>(dispatch, res.data)
        }
      })
      .catch(err => {
        handleServerNetworkError(dispatch, err)
      })
  }
}

export const removeTaskTC = (todolistId: string, taskId: string) => {
  return (dispatch: Dispatch<actionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistsAPI.deleteTask(todolistId, taskId)
      .then(res => {
        if (res.data.resultCode === 0) {
          const action = removeTaskAC(todolistId, taskId)
          dispatch(action)
          dispatch(setLoadingStatusAC('idle'))
        }
        else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch(err => {
        handleServerNetworkError(dispatch, err)
      })
  }
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
  return (dispatch: Dispatch<actionsType>, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает,
// а не только те, которые мы хотим обновить, соответственно нам нужно в этом месте взять
// таску целиком  // чтобы у неё отобрать остальные св-ва

    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
      return t.id === taskId
    })

    if (task) {
      dispatch(setLoadingStatusAC('loading'))
      todolistsAPI.updateTask(todolistId, taskId, {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: status
      })
        .then(res => {
          if (res.data.resultCode === 0) {
            const action = changeTaskStatusAC(todolistId, taskId, status)
            dispatch(action)
            dispatch(setLoadingStatusAC('idle'))
          }
          else {
            handleServerAppError(dispatch, res.data)
          }
        })
        .catch(err => {
          handleServerNetworkError(dispatch, err)
        })
    }
  }
}

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) => {
  return (dispatch: Dispatch<actionsType>, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает,
// а не только те, которые мы хотим обновить, соответственно нам нужно в этом месте взять
// таску целиком  // чтобы у неё отобрать остальные св-ва

    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
      return t.id === taskId
    })

    if (task) {
      dispatch(setLoadingStatusAC('loading'))
      todolistsAPI.updateTask(todolistId, taskId, {
        title: title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status
      })
        .then((res) => {
          if (res.data.resultCode === 0) {
            const action = changeTaskTitleAC(todolistId, taskId, title)
            dispatch(action)
            dispatch(setLoadingStatusAC('idle'))
          } else {
            handleServerAppError(dispatch, res.data)
          }
        })
        .catch(err => {
          handleServerNetworkError(dispatch, err)
        })
    }
  }
}







