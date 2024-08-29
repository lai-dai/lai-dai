import { LocaleToggle } from '@/components/locale-toggle'

import { MainNav } from './nav-main'
import { MobileNav } from './nav-mobile'

export function SiteHeader() {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 w-full border-b border-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav />

        <div className="ml-auto">
          <LocaleToggle />
        </div>
      </div>
    </header>
  )
}
