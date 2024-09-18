import { LocaleToggle } from '@/components/locale-toggle'
import { ModeToggle } from '@/components/mode-toggle'

import { MainNav } from './nav-main'
import { MobileNav } from './nav-mobile'

export function SiteHeader() {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 w-full border-b border-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-14 items-center gap-3">
        <div className="flex-1">
          <MainNav />
          <MobileNav />
        </div>

        <LocaleToggle />
        <ModeToggle />
      </div>
    </header>
  )
}
