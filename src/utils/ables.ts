export function nonNullable<T>(x: T | null): x is NonNullable<T> {
  return x !== null
}
