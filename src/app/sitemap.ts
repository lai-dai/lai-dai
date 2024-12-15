import { type MetadataRoute } from "next"
import { siteConfig } from "~/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString().split("T")[0]

  const staticPaths = [
    "",
    "/guest-book",
    "/articles",
    "/coding-activity",
    "/coding-activity/activity",
    "/coding-activity/editor",
    "/coding-activity/operating-systems",
  ].map(route => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
  }))

  // const docs = getContents('docs')
  // const postPaths = docs.map(doc => ({
  //   url: `${siteConfig.url}/posts/${doc.slug}`,
  //   lastModified: new Date(doc.metadata.lastUpdate).toISOString().split("T")[0],
  // }))

  return [...staticPaths]
}
