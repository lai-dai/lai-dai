/**
 * Part of this code is taken from react spectrum ❤️
 */

export function chain<T>(...callbacks: (((...args: T[]) => unknown) | undefined)[]) {
  return (...args: T[]) => {
    callbacks.forEach((callback) => {
      // eslint-disable-next-line no-restricted-syntax
      if (callback instanceof Function) {
        // eslint-disable-next-line callback-return
        callback(...args)
      }
    })
  }
}
