import {todolistsAPI, TodolistType} from '../api/todolist-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {
  RequestStatusType,
  setLoadingStatusAC,
  setLoadingStatusAT,
  setAppErrorAT,
  setAppErrorAC
} from "./app-reducer";
import {AxiosError} from "axios";
import {
  handleServerAppError,
  handleServerNetworkError
} from "../utils/error-utils";

export type FilterValuesType = "all" | "active" | "completed";

export const addTodolistAC = (todolist: TodolistType) => {
  return {
    type: "TODOLIST/ADD-TODOLIST",
    todolist: todolist
  } as const
}

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: "TODOLIST/REMOVE-TODOLIST",
    todolistId
  } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: "TODOLIST/CHANGE-TODOLIST-TITLE",
    todolistId,
    title
  } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return {
    type: "TODOLIST/CHANGE-TODOLIST-FILTER",
    todolistId,
    filter
  } as const
}

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
  return {
    type: "TODOLIST/SET-TODOLISTS",
    todolists
  } as const
}

export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => {
  return {
    type: 'TODOLIST/CHANGE-TODOLIST-ENTITY-STATUS',
    todolistId,
    entityStatus
  } as const
}

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type changeTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>

export type actionsType = AddTodolistAT
  | RemoveTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT
  | SetTodolistsAT
  | changeTodolistEntityStatusAT
  | setLoadingStatusAT
  | setAppErrorAT

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType,
  entityStatus: RequestStatusType
}


const initialState: Array<TodolistDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
  {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]
/*type initialStateType = typeof initialState*/

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: actionsType): Array<TodolistDomainType> => {
  switch (action.type) {

    case "TODOLIST/ADD-TODOLIST": {
      const stateCopy = [...state]
      const newTodolistWithFilter: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'}
      return [newTodolistWithFilter, ...stateCopy]
    }

    case "TODOLIST/REMOVE-TODOLIST": {
      return state.filter(tl => tl.id !== action.todolistId)
    }

    case "TODOLIST/CHANGE-TODOLIST-TITLE": {
      const stateCopy = state.map((tl:TodolistDomainType) => {
        return (
          tl.id === action.todolistId ? {...tl, title: action.title} : tl
        )
      })
      return stateCopy
    }

    case "TODOLIST/CHANGE-TODOLIST-FILTER": {
      const stateCopy = state.map((tl:TodolistDomainType) => {
        return (
          tl.id === action.todolistId ? {...tl, filter: action.filter} : tl
        )
      })
      return stateCopy
    }

    case "TODOLIST/SET-TODOLISTS": {
      return action.todolists.map((tl: TodolistType)=>{
        return {...tl, filter: 'all', entityStatus: 'idle'}
      })
    }

    case 'TODOLIST/CHANGE-TODOLIST-ENTITY-STATUS': {
      const stateCopy = state.map((tl:TodolistDomainType) => {
        return (
          tl.id === action.todolistId ? {...tl, entityStatus: action.entityStatus} : tl
        )
      })
      return stateCopy
    }

    default:
      return state
  }
}

//THUNK

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch<actionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistsAPI.getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC(res.data))
        dispatch(setLoadingStatusAC('idle'))
      })
      .catch(err => {
        handleServerNetworkError(dispatch, err)
      })
  }
}

export const addTodolistTC = (title: string) => {

  return (dispatch: Dispatch<actionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistsAPI.createTodolist(title)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(addTodolistAC(res.data.data.item))
          dispatch(setLoadingStatusAC('idle'))
        } else {
          handleServerAppError<{item: TodolistType}>(dispatch, res.data)
        }
      })
      .catch(err => {
        handleServerNetworkError(dispatch, err)
      })
  }
}

export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch<actionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(removeTodolistAC(todolistId))
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

export const updateTodolistTitleTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch<actionsType>, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает,
// а не только те, которые мы хотим обновить, соответственно нам нужно в этом месте взять
// таску целиком  // чтобы у неё отобрать остальные св-ва

    const allTodolistsFromState = getState().todolists;
    const todolist = allTodolistsFromState.find(t => {
      return t.id === todolistId
    })

    if (todolist) {
      dispatch(setLoadingStatusAC('loading'))
      todolistsAPI.updateTodolist(todolistId, title)
        .then((res) => {
          if (res.data.resultCode === 0) {
            const action = changeTodolistTitleAC(todolistId, title)
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