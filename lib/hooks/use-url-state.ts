import {
  Reducer,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type SetStateAction<S> = Partial<S> | ((prevState: S) => Partial<S>)
type Primitive = string | number
type State = Record<string, Primitive | Primitive[]>
export type UseUrlStateOptions<S extends Record<string, any>> = {
  setByInit?: boolean
  skipNulls?: boolean
  navigateMode?: 'push' | 'replace'
  queryString?: {
    stringify: (value: S) => string
    parse: (value: string) => S
  }
}

const isSSR =
  typeof window === 'undefined' ||
  /ServerSideRendering/.test(navigator && navigator.userAgent)

const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect

export function useUrlState<S extends State>(
  initialState: S,
  {
    setByInit = true,
    skipNulls = false,
    navigateMode = 'push',
    queryString,
  }: UseUrlStateOptions<S> = {}
) {
  if (!initialState)
    throw new Error('initialState must be defined with an object')

  const searchParams = useSearchParams()
  const router = useRouter()
  const previousSearch = useRef<string>(searchParams.toString())

  const qs = useMemo(
    () =>
      queryString ??
      createQueryString<S>({
        initialState,
        setByInit,
        skipNulls,
      }),
    [queryString]
  )

  const initializer = useCallback(
    (init: S) => {
      const search = searchParams.toString()

      if (search === '') return init

      return qs.parse(search)
    },
    [searchParams]
  )

  const navigator = useCallback(
    (search: string) => {
      if (isSSR) return

      const url = new URL(window.location.href)
      url.search = search

      if (navigateMode === 'push') window.history.pushState(null, '', url)
      else window.history.replaceState(null, '', url)

      return url
    },
    [navigateMode]
  )

  const reducerReturns = useReducer<Reducer<S, SetStateAction<S>>, S>(
    (state, action) => {
      const payload = action instanceof Function ? action(state) : action
      const value = Object.assign({}, state, payload)

      const search = qs.stringify(value)
      const url = navigator(search)
      previousSearch.current = url?.search || ''

      return value
    },
    initialState,
    initializer
  )

  useIsomorphicLayoutEffect(() => {
    if (window.location.search.slice(1) !== previousSearch.current) {
      window.history.scrollRestoration = 'manual'

      reducerReturns[1](initializer(initialState))
    }
    return () => {
      window.history.scrollRestoration = 'auto'
    }
  }, [searchParams])

  return reducerReturns
}

function isNumber(num: any) {
  if (typeof num === 'number') return num - num === 0

  if (typeof num === 'string' && num.trim() !== '')
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num)

  return false
}

function createQueryString<S extends Record<string, any>>(options: {
  initialState: S
  skipNulls?: boolean
  setByInit?: boolean
}) {
  function stringify(value: State): string {
    const urlSearchParams = new URLSearchParams(window.location.search)

    Object.keys(value).forEach((name) => {
      if (
        value[name] === undefined ||
        (options?.skipNulls && value[name] === null)
      )
        urlSearchParams.delete(name)
      else if (Array.isArray(value[name]))
        value[name].map((item) => {
          urlSearchParams.set(name, item.toString())
        })
      else urlSearchParams.set(name, value[name].toString())
    })

    return urlSearchParams.toString()
  }

  function parse(value: string): S {
    const urlSearchParams = new URLSearchParams(value)

    let searchParamsKeys = Array.from(urlSearchParams.keys())

    if (options?.setByInit)
      searchParamsKeys = searchParamsKeys.filter(
        (key) => key in options.initialState
      )

    const uniQueParamsKeys = new Set(searchParamsKeys)

    const paramsObj: State = {}

    uniQueParamsKeys.forEach((key) => {
      const valueArr = urlSearchParams.getAll(key)

      if (valueArr.length > 1) Object.assign(paramsObj, { [key]: valueArr })
      else if (isNumber(options.initialState[key]))
        Object.assign(paramsObj, {
          [key]: Number(urlSearchParams.get(key)),
        })
      else Object.assign(paramsObj, { [key]: urlSearchParams.get(key) })
    })

    return Object.assign({}, options.initialState, paramsObj)
  }

  return {
    stringify,
    parse,
  }
}
