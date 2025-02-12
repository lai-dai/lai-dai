import { env } from "~/env"
import createClient from "openapi-fetch"
import { AdminPaths } from "~/types/api"
import qs from "qs"
import { getDefaultAccessKey } from "~/utils/token"

const baseUrl = env.NEXT_PUBLIC_API_ENDPOINT_URL
// server only
const suffixDefaultAccessKey = env.SUFFIX_DEFAULT_ACCESS_KEY

const apiServer = createClient<AdminPaths>({
  baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  querySerializer(params) {
    // default key
    params.key = getDefaultAccessKey(suffixDefaultAccessKey)

    return qs.stringify(params, {
      encodeValuesOnly: true, // prettify URL
    })
  },
})

export { apiServer }
