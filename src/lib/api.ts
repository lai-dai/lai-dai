import { type Session } from "next-auth"
import { getSession } from "next-auth/react"
import createClient, { type Middleware } from "openapi-fetch"
import qs from "qs"
import { env } from "~/env"
import { type ClientPaths } from "~/types/api"
import { getDefaultAccessKey } from "~/utils/token"

const baseUrl = env.NEXT_PUBLIC_API_ENDPOINT_URL
let suffixDefaultAccessKey: string | undefined

export function setSuffixDefaultAccessKey(str?: string) {
  suffixDefaultAccessKey = str
}

const api = createClient<ClientPaths>({
  baseUrl: `${baseUrl}/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  querySerializer(params) {
    // default key
    if (suffixDefaultAccessKey) {
      params.key = getDefaultAccessKey(suffixDefaultAccessKey)
    }

    return qs.stringify(params, {
      encodeValuesOnly: true, // prettify URL
    })
  },
})

let sessionCache: Session | null = null

const UNPROTECTED_ROUTES = [
  "/auth/local",
  "/auth/local/register",
  "/auth/forgot-password",
  "/auth/reset-password",
]

const authMiddleware: Middleware = {
  async onRequest({ schemaPath, request }) {
    if (UNPROTECTED_ROUTES.some(p => schemaPath.startsWith(p))) {
      return undefined // don’t modify request for certain paths
    }

    // for all other paths, set Authorization header as expected
    if (request.method !== "GET") {
      if (!sessionCache) {
        sessionCache = await getSession()
      }

      if (sessionCache?.user.token) {
        request.headers.set(
          "Authorization",
          `Bearer ${sessionCache.user.token}`,
        )
      }
    }
    return request
  },
}

api.use(authMiddleware)

export { api }
