import { ReactNode } from 'react'

import { BackgroundHighlight } from '@/components/ui/hero-highlight'

import { SiteFooter } from './_layout/site-footer'
import { SiteHeader } from './_layout/site-header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <BackgroundHighlight
      classNames={{ container: 'h-screen' }}
      className="flex min-h-svh flex-col"
    >
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </BackgroundHighlight>
  )
}
