import {
  type Session,
} from "next-auth"
import {
  getSession,
} from "next-auth/react"

import {
  env,
} from "~/env"
import {
  CustomFetch,
} from "~/lib/custom-fetch"

export const apiPublic = new CustomFetch({
  baseUrl: env.NEXT_PUBLIC_API_ENDPOINT_URL,
})

export const api = new CustomFetch({
  baseUrl: env.NEXT_PUBLIC_API_ENDPOINT_URL,
  headers: {
    Authorization: `Bearer ${env.NEXT_PUBLIC_DEFAULT_TOKEN}`,
  },
})

export const apiAuth = new CustomFetch({
  baseUrl: env.NEXT_PUBLIC_API_ENDPOINT_URL,
})

let sessionCache: Session | null = null

// Add Interceptors:
apiAuth.addRequestInterceptor(async (config) => {
  if (!sessionCache) {
    sessionCache = await getSession()
  }

  if (sessionCache?.user.token) {
    (config.headers as Record<string, unknown>).Authorization
    = `Bearer ${sessionCache.user.token}`
  }

  return config
})
