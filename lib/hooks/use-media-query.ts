import { useEffect, useLayoutEffect, useMemo, useState } from 'react'

const isSSR =
  typeof window === 'undefined' ||
  /ServerSideRendering/.test(navigator && navigator.userAgent)

export const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const sizeMap = {
  xs: '(max-width: 639px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
}

const matchMedia = (query: string) => {
  if (canUseDOM) {
    return window.matchMedia(query)
  }

  return {
    matches: false,
    media: query,
  } as MediaQueryList
}

/**
 * React hook that tracks state of a CSS media query
 */
export function useMediaQuery(
  /**
   * xs: "(max-width: 639px)" |
   * sm: "(min-width: 640px)" |
   * md: "(min-width: 768px)" |
   * lg: "(min-width: 1024px)" |
   * xl: "(min-width: 1280px)" |
   * "2xl": "(min-width: 1536px)" |
   */
  query: string | (keyof typeof sizeMap)[]
): any
export function useMediaQuery(query: keyof typeof sizeMap | string[]): any
export function useMediaQuery(query: string | string[]): boolean | boolean[] {
  const mediaQueries = useMemo(() => {
    const queries = Array.isArray(query) ? query : [query]
    return queries.map(
      (query) => sizeMap?.[query as keyof typeof sizeMap] || query
    )
  }, [query])

  const [mediaQueryArray, setMediaQueryArray] = useState(() =>
    mediaQueries.map((query) => matchMedia(query).matches)
  )

  useIsomorphicLayoutEffect(() => {
    const list = mediaQueries.map((query) => matchMedia(query))
    const handleChange = (event: MediaQueryListEvent) => {
      const index = list.findIndex((item) => item.media === event.media)
      if (index !== -1) {
        setMediaQueryArray((prev) => {
          const result = [...prev]
          result[index] = event.matches

          return result
        })
      }
    }

    list.forEach((query) => {
      query.addEventListener('change', handleChange)
    })

    return () =>
      list.forEach((query) => {
        query.removeEventListener('change', handleChange)
      })
  }, [mediaQueries])

  if (Array.isArray(query)) {
    return mediaQueryArray
  }

  return mediaQueryArray[0]
}
