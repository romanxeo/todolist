export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const setLoadingStatusAC = (statusRequest: RequestStatusType) => {
  return {
    type: "APP/SET-STATUS",
    statusRequest
  } as const
}

export const setAppErrorAC = (error: null | string) => ({type: "APP/SET-ERROR", error} as const)

export type setLoadingStatusAT = ReturnType<typeof setLoadingStatusAC>
export type setAppErrorAT = ReturnType<typeof setAppErrorAC>


export const initialState = {
  status: 0,
  error: null as null | string,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: actionAppType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      let copyState = {...state};
      if (action.statusRequest === 'loading') {
        copyState.status++
      }
      else {
        copyState.status--
      }
      return copyState
    }
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    default:
      return state
  }
}

export type actionAppType = setLoadingStatusAT | setAppErrorAT