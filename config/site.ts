export type SiteConfig = typeof siteConfig

export type Locale = (typeof locales)[number]

const locales = ['en', 'vi'] as const
const defaultLocale: Locale = 'vi'

export const siteConfig = {
  locales,
  defaultLocale,
  name: 'Lai Dai',
  description: 'Trang cá nhân',
  url: 'https://laidai.xyz',
  links: {
    twitter: 'https://x.com/laidai9966',
    github: 'https://github.com/lai-dai/laidai',
  },
  author: 'laidai',
  robots: 'noindex',
}
