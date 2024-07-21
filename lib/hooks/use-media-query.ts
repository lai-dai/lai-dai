import { useState } from 'react'

import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const mediaQuerySizeMap = {
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
  query: string | (keyof typeof mediaQuerySizeMap)[]
): any
export function useMediaQuery(
  query: keyof typeof mediaQuerySizeMap | string[]
): any
export function useMediaQuery(query: string | string[]): boolean | boolean[] {
  const queries = Array.isArray(query) ? query : [query]
  const mediaQueries = queries.map(
    (query) =>
      mediaQuerySizeMap?.[query as keyof typeof mediaQuerySizeMap] || query
  )

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
