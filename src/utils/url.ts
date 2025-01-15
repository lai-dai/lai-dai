import { env } from "~/env";

export function absoluteUrl(path?: string) {
  if (path?.startsWith("https")) {
    return path
  }
  return `${env.NEXT_PUBLIC_API_ENDPOINT_URL}${path ?? ''}`
}
