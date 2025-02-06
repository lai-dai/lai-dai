import { type Session } from "next-auth"
import { getSession } from "next-auth/react"
import createClient, { type Middleware } from "openapi-fetch"
import qs from "qs"
import { env } from "~/env"
import { type Paths } from "~/lib/api/api-schema"
import { md5 } from "~/lib/crypto"

const suffixDefaultAccessKey = env.SUFFIX_DEFAULT_ACCESS_KEY

const getDefaultAccessKey = (data?: string) => {
  const today = new Date().toISOString().split("T")[0]

  return md5(`${data ?? ""}${today}`)
}

const baseUrl = `${env.NEXT_PUBLIC_API_ENDPOINT_URL}/api`

const client = createClient<Paths>({
  baseUrl,
  headers: {
    Accept: "application/json",
  },
  querySerializer(params) {
    // default key
    params.key = getDefaultAccessKey(suffixDefaultAccessKey)

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

client.use(authMiddleware)

export { client }
