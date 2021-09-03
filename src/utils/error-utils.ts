import { Dispatch } from "redux";
import {
  setAppErrorAC,
  setLoadingStatusAC
} from "../store/app-reducer";
import {ResponseType} from "../api/todolist-api"
import {actionAppType} from "../store/app-reducer"

export const handleServerNetworkError  = (dispatch: Dispatch<actionAppType>, message: string) => {
  dispatch(setAppErrorAC(message))
  dispatch(setLoadingStatusAC('idle'))
}

export const handleServerAppError = <T>(dispatch: Dispatch<actionAppType>, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setLoadingStatusAC('idle'))
}