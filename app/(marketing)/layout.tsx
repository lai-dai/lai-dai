import { ReactNode } from 'react'

import { SiteFooter } from './_layout/site-footer'
import { SiteHeader } from './_layout/site-header'
import { ProvidersMarketing } from './providers'

export default function LayoutMarketing({ children }: { children: ReactNode }) {
  return (
    <ProvidersMarketing>
      <div className="relative flex h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </div>
    </ProvidersMarketing>
  )
}
