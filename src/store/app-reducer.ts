export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const setLoadingStatusAC = (status: RequestStatusType) => {
  return {
    type: "APP/SET-STATUS",
    status
  } as const
}

export const setAppErrorAC = (error: null | string) => ({type: "APP/SET-ERROR", error} as const)

export type setLoadingStatusAT = ReturnType<typeof setLoadingStatusAC>
export type setAppErrorAT = ReturnType<typeof setAppErrorAC>


const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    default:
      return state
  }
}

type ActionsType = setLoadingStatusAT | setAppErrorAT