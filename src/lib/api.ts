import {
  type Session,
} from "next-auth"
import {
  getSession,
} from "next-auth/react"

import {
  env,
} from "~/env"
import { md5 } from "~/lib/crypto"
import {
  CustomFetch,
} from "~/lib/custom-fetch"

const getDefaultToken = (data?: string) => {
  const today = new Date().toISOString().split("T")[0]

  return md5(`${data ?? ""}${today}`)
}

export const publicApi = new CustomFetch({
  baseUrl: env.NEXT_PUBLIC_API_ENDPOINT_URL,
})

export const api = new CustomFetch({
  baseUrl: env.NEXT_PUBLIC_API_ENDPOINT_URL,
  headers: {
    Authorization: `Bearer ${getDefaultToken(env.SUFFIX_DEFAULT_ACCESS_KEY)}`,
  },
})

export const authApi = new CustomFetch({
  baseUrl: env.NEXT_PUBLIC_API_ENDPOINT_URL,
})

let sessionCache: Session | null = null

// Add Interceptors:
authApi.addRequestInterceptor(async (config) => {
  if (!sessionCache) {
    sessionCache = await getSession()
  }

  if (sessionCache?.user.token) {
    (config.headers as Record<string, unknown>).Authorization
    = `Bearer ${sessionCache.user.token}`
  }

  return config
})
