import { createFetcher } from './utils/fetcher'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const apiServer = createFetcher({
  baseUrl,
})
