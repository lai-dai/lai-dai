import { getSession } from 'next-auth/react'

import { env } from './env'
import { createFetcher } from './utils/fetcher'

const baseUrl = env.NEXT_PUBLIC_API_URL
const nextUrl = env.NEXT_PUBLIC_BASE_URL
const tmdbUrl = env.NEXT_PUBLIC_THE_MOVIE_DB_API_URL

export const api = createFetcher({ baseUrl })
export const apiNext = createFetcher({ baseUrl: nextUrl })
export const apiTmdb = createFetcher({
  baseUrl: tmdbUrl,
  onRequest: (init) => {
    init.params = {
      api_key: env.NEXT_PUBLIC_THE_MOVIE_DB_API_KEY,
      ...init.params,
    }

    return init
  },
})

export const apiAdmin = createFetcher({
  baseUrl,
  onRequest: async (init) => {
    const session = await getSession()

    if (session?.user)
      init.headers.Authorization = `Bearer ${session.user.token}`

    return init
  },
})
