import {
  Reducer,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { useSearchParams } from 'next/navigation'

type SetStateAction<S> =
  | Partial<S | typeof URL_STATE_RESET>
  | ((prevState: S) => Partial<S>)
type State = Record<string, any>
export interface UseUrlStateOptions<S extends Record<string, any>> {
  setByInit?: boolean
  skipNulls?: boolean
  override?: boolean
  navigateMode?: 'push' | 'replace'
  queryString?: {
    stringify: (value: Record<string, any>) => string
    parse: (value: string) => S
  }
}

export const URL_STATE_RESET = Symbol(
  process.env.NODE_ENV !== 'production' ? 'RESET' : ''
)

export function useUrlState<S extends State>(
  initialState: S,
  {
    setByInit = true,
    skipNulls = false,
    override = false,
    navigateMode = 'push',
    queryString,
  }: UseUrlStateOptions<S> = {}
) {
  if (!initialState)
    throw new Error('initialState must be defined with an object')

  const searchParams = useSearchParams()
  const previousSearch = useRef<string>(searchParams.toString())

  const qs = useMemo(
    () =>
      queryString ??
      createQueryString<S>({
        initialState,
        setByInit,
        skipNulls,
        override,
      }),
    [queryString, initialState, setByInit, skipNulls, override]
  )

  const initializer = useCallback(
    (value: S) => {
      const search = searchParams.toString()

      if (search === '') return value

      return qs.parse(search)
    },
    [qs, searchParams]
  )

  const navigator = useCallback(
    (value: Record<string, any>) => {
      if (isSSR) return

      const url = new URL(window.location.href)
      const search = qs.stringify(value)

      url.search = search
      previousSearch.current = search

      if (navigateMode === 'push') window.history.pushState(null, '', url)
      else window.history.replaceState(null, '', url)
    },
    [navigateMode, qs]
  )

  const reducerReturns = useReducer<Reducer<S, SetStateAction<S>>, S>(
    (state, action) => {
      if (action === URL_STATE_RESET) {
        const undefinedInit = Object.fromEntries(
          Object.keys(initialState).map((key) => [key, undefined])
        )
        navigator(undefinedInit)

        return initialState
      }

      const payload = action instanceof Function ? action(state) : action
      navigator(payload)

      return Object.assign({}, state, payload)
    },
    initialState,
    initializer
  )

  useIsomorphicLayoutEffect(() => {
    if (window.location.search.slice(1) !== previousSearch.current)
      reducerReturns[1](initializer(initialState))

    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = 'auto'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return reducerReturns
}

const isSSR =
  typeof window === 'undefined' ||
  /ServerSideRendering/.test(navigator && navigator.userAgent)

const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect

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
  override?: boolean
}) {
  function stringify(value: Record<string, any>): string {
    const urlSearchParams = new URLSearchParams(
      options.override ? undefined : window.location.search
    )

    Object.keys(value).forEach((name) => {
      if (Array.isArray(value[name])) {
        urlSearchParams.delete(name)

        value[name].forEach((item) => {
          if (item === undefined || (options?.skipNulls && item === null))
            return
          switch (typeof item) {
            case 'string':
            case 'number':
              urlSearchParams.append(name, String(item))
              break
          }
        })
      } else if (
        value[name] === undefined ||
        (options?.skipNulls && value[name] === null)
      )
        urlSearchParams.delete(name)
      else
        switch (typeof value[name]) {
          case 'string':
          case 'number':
            urlSearchParams.set(name, String(value[name]))
            break
        }
    })

    return urlSearchParams.toString()
  }

  function parse(value: string): S {
    const urlSearchParams = new URLSearchParams(value)

    let searchParamsKeys = Array.from(urlSearchParams.keys())

    if (options?.setByInit) {
      searchParamsKeys = searchParamsKeys.filter(
        (key) => key in options.initialState
      )
    }

    const uniQueParamsKeys = new Set(searchParamsKeys)

    const paramsObj: Record<string, any> = {}

    uniQueParamsKeys.forEach((key) => {
      const valueArr = urlSearchParams.getAll(key)

      if (valueArr.length > 1) {
        if (isNumber(options.initialState[key][0])) {
          Object.assign(paramsObj, { [key]: valueArr.map(Number) })
        } else {
          Object.assign(paramsObj, { [key]: valueArr })
        }
      } else if (isNumber(options.initialState[key])) {
        Object.assign(paramsObj, {
          [key]: Number(urlSearchParams.get(key)),
        })
      } else {
        Object.assign(paramsObj, { [key]: urlSearchParams.get(key) })
      }
    })

    return Object.assign({}, options.initialState, paramsObj)
  }

  return {
    stringify,
    parse,
  }
}
