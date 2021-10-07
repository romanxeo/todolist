import { Dispatch } from 'redux'
import {
  actionAppType,
  setAppErrorAT,
  setLoadingStatusAC,
  setLoadingStatusAT
} from './app-reducer'
import {
  authAPI,
  LoginParamsType,
  TaskType,
  todolistsAPI
} from "../api/todolist-api";
import {
  handleServerAppError,
  handleServerNetworkError
} from "../utils/error-utils";
import {clearTodolistDataAC} from "./todolists-reducer";

// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// types
export type setIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>

type ActionsType = setIsLoggedInAT | setLoadingStatusAT | setAppErrorAT

const initialState = {
  isLoggedIn: false
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}

export const loginTC = (payload: LoginParamsType) => {
  return (dispatch: Dispatch<actionAppType>) => {
    dispatch(setLoadingStatusAC('loading'))
    authAPI.login(payload)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true))
          dispatch(setLoadingStatusAC('idle'))
        } else {
          handleServerAppError<{ userId: number }>(dispatch, res.data)
        }
      })
      .catch(err => {
        handleServerNetworkError(dispatch, err)
      })
  }
}

export const logoutTC = () => {
  return (dispatch: Dispatch<actionAppType>) => {
    dispatch(setLoadingStatusAC('loading'))
    authAPI.logout()
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(clearTodolistDataAC())
          dispatch(setIsLoggedInAC(false))
          dispatch(setLoadingStatusAC('idle'))
        } else {
          handleServerAppError<{ userId: number }>(dispatch, res.data)
        }
      })
      .catch(err => {
        handleServerNetworkError(dispatch, err)
      })
  }
}
