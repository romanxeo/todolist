import {Dispatch} from "redux";
import {setIsLoggedInAC, setIsLoggedInAT} from "./authReducer";
import {authAPI} from "../api/todolist-api";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const setLoadingStatusAC = (statusRequest: RequestStatusType) => {
  return {
    type: "APP/SET-STATUS",
    statusRequest
  } as const
}

export const setAppErrorAC = (error: null | string) => ({
  type: "APP/SET-ERROR",
  error
} as const)

export const setInitializedAC = (isInitialized: boolean) => ({
  type: "APP/SET-INITIALIZED",
  isInitialized
} as const)

export type setLoadingStatusAT = ReturnType<typeof setLoadingStatusAC>
export type setAppErrorAT = ReturnType<typeof setAppErrorAC>
export type setInitializedAT = ReturnType<typeof setInitializedAC>

export type actionAppType =
  setLoadingStatusAT
  | setAppErrorAT
  | setInitializedAT
  | setIsLoggedInAT

export const initialState = {
  status: 0,
  error: null as null | string,
  isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: actionAppType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      let copyState = {...state};
      if (action.statusRequest === 'loading') {
        copyState.status++
      } else {
        copyState.status--
      }
      return copyState
    }
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    case "APP/SET-INITIALIZED": {
      return {...state, isInitialized: action.isInitialized}
    }
    default:
      return state
  }
}


export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
      } else {
      }
    })
    .finally(() => {
        dispatch(setInitializedAC(true))
      }
    )
}
