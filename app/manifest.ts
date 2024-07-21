import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: '/',
    theme_color: '#000000',
    background_color: '#000000',
    display: 'standalone',
    lang: siteConfig.defaultLocale,
  }
}
