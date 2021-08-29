import {todolistsAPI, TodolistType} from '../api/todolist-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type FilterValuesType = "all" | "active" | "completed";

export const addTodolistAC = (todolist: TodolistType) => {
  return {
    type: "ADD-TODOLIST",
    todolist: todolist
  } as const
}

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    todolistId
  } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    todolistId,
    title
  } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    todolistId,
    filter
  } as const
}

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
  return {
    type: "SET-TODOLISTS",
    todolists
  } as const
}

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>

export type actionsType = AddTodolistAT
  | RemoveTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT
  | SetTodolistsAT

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}


const initialState: Array<TodolistDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
  {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]
/*type initialStateType = typeof initialState*/

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: actionsType): Array<TodolistDomainType> => {
  switch (action.type) {

    case "ADD-TODOLIST": {
      const stateCopy = [...state]
      const newTodolistWithFilter: TodolistDomainType = {...action.todolist, filter: 'all'}
      return [newTodolistWithFilter, ...stateCopy]
    }

    case "REMOVE-TODOLIST": {
      return state.filter(tl => tl.id !== action.todolistId)
    }

    case "CHANGE-TODOLIST-TITLE": {
      const stateCopy = state.map((tl:TodolistDomainType) => {
        return (
          tl.id === action.todolistId ? {...tl, title: action.title} : tl
        )
      })
      return stateCopy
    }

    case "CHANGE-TODOLIST-FILTER": {
      const stateCopy = state.map((tl:TodolistDomainType) => {
        return (
          tl.id === action.todolistId ? {...tl, filter: action.filter} : tl
        )
      })
      return stateCopy
    }

    case "SET-TODOLISTS": {
      return action.todolists.map((tl: TodolistType)=>{
        return {...tl, filter: 'all'}
      })
    }

    default:
      return state
  }
}

//THUNK

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC(res.data))
      })
  }
}

export const addTodolistTC = (title: string) => {
  debugger
  return (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
      .then(res => {
        debugger
        let newTodolist = res.data.data.item
        const action = addTodolistAC(newTodolist)
        dispatch(action)
      })
  }
}

export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
      .then(res => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
      })
  }
}

export const updateTodolistTitleTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает,
// а не только те, которые мы хотим обновить, соответственно нам нужно в этом месте взять
// таску целиком  // чтобы у неё отобрать остальные св-ва

    const allTodolistsFromState = getState().todolists;
    const todolist = allTodolistsFromState.find(t => {
      return t.id === todolistId
    })

    if (todolist) {
      todolistsAPI.updateTodolist(todolistId, title).then(() => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatch(action)
      })
    }
  }
}