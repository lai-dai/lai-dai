export function mergeEvent<E>(
  ...handlers: (((event: E, ...payload: any[]) => void) | undefined)[]
) {
  return (event: E, ...payload: any[]) => {
    handlers.forEach((handler) => {
      if (handler instanceof Function) {
        handler(event, ...payload)
      }
    })
  }
}
