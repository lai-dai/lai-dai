import { LocaleToggle } from './locale-toggle'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'

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
