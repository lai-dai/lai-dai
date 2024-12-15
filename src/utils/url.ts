import { siteConfig } from "~/config/site";

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`
}
