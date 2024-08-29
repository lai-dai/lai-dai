/**
 * Part of this code is taken from react ❤️
 */

import React, { Provider } from 'react'

export interface CreateContextOptions {
  /**
   * If `true`, React will throw if context is `null` or `undefined`
   * In some cases, you might want to support nested context, so you can set it to `false`
   */
  strict?: boolean
  /**
   * Error message to throw if the context is `undefined`
   */
  errorMessage?: string
}

/**
 * Creates a named context, provider, and hook.
 *
 * @param opts create context options
 */
export function createContext<TContext>(
  defaultValue?: TContext,
  {
    strict = true,
    errorMessage = 'useContext must be within a Provider with a value',
  }: CreateContextOptions = {}
) {
  const context = React.createContext<TContext | undefined>(defaultValue)

  function useContext() {
    const c = React.useContext(context)
    if (!c && strict) throw new Error(errorMessage)
    return c
  }

  return [context.Provider, useContext] as [Provider<TContext>, () => TContext]
}
