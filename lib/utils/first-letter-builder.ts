export function firstLetterBuilder(str: any, defaultValue = '', maxLength = 3) {
  if (typeof str !== 'string') return defaultValue
  return str
    .split(' ')
    .map((e, i) => {
      if (i >= maxLength) return ''
      return e.length ? e[0].toUpperCase() : ''
    })
    .join('')
}
