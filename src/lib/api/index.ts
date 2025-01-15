import createClient, { type Middleware } from "openapi-fetch"
import qs from "qs"
import { env } from "~/env"
import type { paths } from "~/lib/api/strapi"

const client = createClient<paths>({
  baseUrl: `${env.NEXT_PUBLIC_API_ENDPOINT_URL}/api`,
  headers: {
    Accept: "application/json",
  },
  querySerializer(params) {
    return qs.stringify(params, {
      encodeValuesOnly: true, // prettify URL
    })
  },
})

const defaultAccessToken: string | undefined =
  env.NEXT_PUBLIC_DEFAULT_ACCESS_TOKEN

const UNPROTECTED_ROUTES = [
  "/auth/local",
  "/auth/local/register",
  "/auth/forgot-password",
  "/auth/reset-password",
]

const authMiddleware: Middleware = {
  onRequest({ schemaPath, request }) {
    if (UNPROTECTED_ROUTES.some(pathname => schemaPath.startsWith(pathname))) {
      return undefined // don’t modify request for certain paths
    }

    // for all other paths, set Authorization header as expected
    if (defaultAccessToken) {
      request.headers.set("Authorization", `Bearer ${defaultAccessToken}`)
    }
    return request
  },
}

client.use(authMiddleware)

export { client }
