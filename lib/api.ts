import { env } from './env'
import { createFetcher } from './utils/fetcher'

const apiHost = env.NEXT_PUBLIC_API_URL

export const api = createFetcher({
  baseUrl: apiHost,
})
