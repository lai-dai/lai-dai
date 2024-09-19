export function tmdbImageUrlBuilder(
  path?: string,
  size = 'w220_and_h330_face',
  defaultValue = ''
) {
  if (!path) return defaultValue
  if (path.startsWith('https')) return path
  return `https://media.themoviedb.org/t/p/${size}${path}`
}
