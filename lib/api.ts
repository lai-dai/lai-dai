import { getSession } from 'next-auth/react'

import { env } from './env'
import { createFetcher } from './utils/fetcher'

const baseUrl = env.NEXT_PUBLIC_API_URL
const url = env.NEXT_PUBLIC_BASE_URL

export const api = createFetcher({ baseUrl })
export const apiNext = createFetcher({ baseUrl: url })

export const apiAdmin = createFetcher({
  baseUrl,
  onRequest: async (init) => {
    const session = await getSession()

    if (session?.user)
      init.headers.Authorization = `Bearer ${session.user.token}`

    return init
  },
})
