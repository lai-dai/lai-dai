import { env } from './env'
import { createFetcher } from './utils/fetcher'

const baseUrl = env.NEXT_PUBLIC_API_URL

export const api = createFetcher({ baseUrl })
