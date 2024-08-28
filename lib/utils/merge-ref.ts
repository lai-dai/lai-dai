import React from 'react'

type PossibleRef<T> = React.Ref<T> | undefined

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function assignRef<TRef>(ref: PossibleRef<TRef>, value: TRef) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (
    ref !== null &&
    ref !== undefined &&
    typeof ref === 'object' &&
    'current' in ref
  ) {
    ;(ref as React.MutableRefObject<TRef>).current = value
  }
}

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
export function mergeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach((ref) => assignRef(ref, node))
}
