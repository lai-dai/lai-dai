import { useCallback, useState } from 'react'

interface UseUncontrolledInput<T> {
  /** Value for controlled state */
  value?: T

  /** Initial value for uncontrolled state */
  defaultValue?: T

  /** Controlled state onChange handler */
  onValueChange?: (value: T, ...payload: any[]) => void
}

function noop() {}

export function useUncontrolled<T>({
  value,
  defaultValue,
  onValueChange,
}: UseUncontrolledInput<T> = {}): [
  T,
  (value: T, ...payload: any[]) => void,
  boolean,
] {
  const [_value, setValue] = useState(defaultValue)

  const handleChange = useCallback((val: T, ...payload: any[]) => {
    setValue(val)
    onValueChange?.(val, ...payload)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (value !== undefined) {
    return [value as T, onValueChange || noop, true]
  }

  return [_value as T, handleChange, false]
}
