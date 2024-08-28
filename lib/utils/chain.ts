/**
 * Part of this code is taken from nextui ❤️
 */

export function chain<TEvent>(
  ...fns: (((event: TEvent, ...payload: any[]) => void) | undefined)[]
) {
  return (ev: TEvent, ...pl: any[]) => {
    fns.forEach((fn) => {
      if (fn instanceof Function) {
        fn(ev, ...pl)
      }
    })
  }
}
