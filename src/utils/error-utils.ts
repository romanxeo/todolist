import { Dispatch } from "redux";
import {setAppErrorAC, setLoadingStatusAC} from "../store/app-reducer";
import {ResponseType} from "../api/todolist-api"


export const handleServerNetworkError  = (dispatch: Dispatch<any>, message: string) => {
  dispatch(setAppErrorAC(message))
  dispatch(setLoadingStatusAC('succeeded'))
}

export const handleServerAppError = <T>(dispatch: Dispatch<any>, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setLoadingStatusAC('succeeded'))
}