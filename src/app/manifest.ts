import { type MetadataRoute } from "next"
import { siteConfig, META_THEME_COLORS } from "~/config/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    theme_color: META_THEME_COLORS.dark,
    background_color: META_THEME_COLORS.dark,
    display: "standalone",
    lang: "vi",
  }
}
