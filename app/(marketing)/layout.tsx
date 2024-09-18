import { ReactNode } from 'react'

import { BackgroundHighlight } from '@/components/ui/hero-highlight'

import { SiteFooter } from './_layout/site-footer'
import { SiteHeader } from './_layout/site-header'
import { ProvidersMarketing } from './providers'

export default function LayoutMarketing({ children }: { children: ReactNode }) {
  return (
    <ProvidersMarketing>
      <BackgroundHighlight
        classNames={{ container: 'h-screen' }}
        className="flex h-screen flex-col overflow-y-auto"
      >
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </BackgroundHighlight>
    </ProvidersMarketing>
  )
}
