/**
 * Part of this code is taken from react spectrum ❤️
 */

import { type ForwardedRef, type MutableRefObject } from "react"

/**
 * Merges multiple refs into one. Works with either callback or object refs.
 */
export function mergeRefs<T>(
  ...refs: Array<ForwardedRef<T> | MutableRefObject<T> | null | undefined>
): ForwardedRef<T> {
  if (refs.length === 1 && refs[0]) {
    return refs[0]
  }

  return (value: T | null) => {
    refs.forEach(ref => {
      if (ref instanceof Function) {
        ref(value)
      } else if (ref !== null && ref !== undefined) {
        ref.current = value
      }
    })
  }
}
