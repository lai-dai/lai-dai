import { useEffect, useLayoutEffect } from 'react'

const isSSR =
  typeof window === 'undefined' ||
  /ServerSideRendering/.test(navigator && navigator.userAgent)

export const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect
