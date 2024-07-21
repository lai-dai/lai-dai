import { useReducer } from 'react'

type SetStateAction<S> = Partial<S> | ((prevState: S) => Partial<S>)

export function useSetState<S extends Record<string, any>>(initialState: S) {
  return useReducer(
    (state: S, action: SetStateAction<S>) =>
      Object.assign(
        {},
        state,
        action instanceof Function ? action(state) : action
      ),
    initialState
  )
}
