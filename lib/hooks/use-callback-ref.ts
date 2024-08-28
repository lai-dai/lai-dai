/**
 * Part of this code is taken from @chakra-ui/system ❤️
 */

import { DependencyList, useCallback, useRef } from 'react'

import { useSafeLayoutEffect } from './use-safe-layout-effect'

/**
 * React hook to persist any value between renders,
 * but keeps it up-to-date if it changes.
 *
 * @param fn the function to persist
 * @param deps the function dependency list
 */
export function useCallbackRef<T extends (...args: any[]) => any>(
  fn?: T,
  deps: DependencyList = []
) {
  const ref = useRef(fn)

  useSafeLayoutEffect(() => {
    ref.current = fn
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(((...args) => ref.current?.(...args)) as T, deps)
}
