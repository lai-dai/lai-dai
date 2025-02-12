/**
 * Part of this code is taken from react spectrum ❤️
 */

export function chain<T>(
  ...callbacks: (((...args: T[]) => unknown) | undefined)[]
) {
  return (...args: T[]) => {
    callbacks.forEach(callback => {
      if (callback instanceof Function) {
        callback(...args)
      }
    })
  }
}
