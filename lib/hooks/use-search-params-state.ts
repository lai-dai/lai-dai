import { useCallback, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useSetState } from './use-set-state'

type Dispatch<A> = (value: A) => void
type SetStateAction<S> = Partial<S> | ((prevState: S) => Partial<S>)

export function useSearchParamsState<S extends Record<string, any>>(
  initialState?: S | (() => S),
  {
    getOnInit = true,
    getByInit = true,
    ...opt
  }: {
    parse?: () => Record<string, any>
    stringify?: (obj: S) => string
    getOnInit?: boolean
    getByInit?: boolean
  } = {}
): [S, Dispatch<SetStateAction<S>>] {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getQueryString = useCallback(
    (state?: S | (() => S)) => {
      if (state !== null && state !== undefined) {
        const obj1 = state instanceof Function ? state() : state

        if (searchParams.toString() === '') {
          return initialState || {}
        } else {
          if (typeof obj1 === 'object') {
            const dataArr =
              opt?.parse instanceof Function
                ? opt.parse().entries()
                : Array.from(searchParams.entries())

            const obj2 = Object.fromEntries(
              dataArr.filter(([name]: [string]) =>
                getByInit ? name in obj1 : true
              )
            )

            return Object.assign({}, obj1, obj2)
          }
          return {}
        }
      }
      return Object.fromEntries(searchParams.entries())
    },
    [getByInit, initialState, opt, searchParams]
  )

  const [state, setState] = useSetState<S>(
    (getOnInit
      ? getQueryString(initialState)
      : initialState instanceof Function
        ? initialState()
        : initialState) as S
  )

  useEffect(() => {
    setState(getQueryString(state) as S)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const createQueryString = useCallback(
    (obj2: Record<string, any>) => {
      if (typeof obj2 === 'object') {
        if (
          opt?.parse instanceof Function &&
          opt.stringify instanceof Function
        ) {
          const obj1 = opt.parse()

          return opt.stringify(Object.assign({}, obj1, obj2) as S)
        }

        const params = new URLSearchParams(searchParams.toString())

        Object.entries(obj2).forEach(([name, value]) => {
          if (value !== undefined) {
            params.set(name, value)
          } else {
            params.delete(name)
          }
        })
        return params.toString()
      }
      return ''
    },
    [opt, searchParams]
  )

  const setPayload: Dispatch<SetStateAction<S>> = useCallback(
    (statePartial) => {
      const _state =
        statePartial instanceof Function ? statePartial(state) : statePartial

      if (typeof _state === 'object') {
        setState(_state)

        router.push(`${pathname}?${createQueryString(_state)}`)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, state]
  )

  return [state, setPayload]
}
