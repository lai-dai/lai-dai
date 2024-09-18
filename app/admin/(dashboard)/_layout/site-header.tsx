import React from 'react'
import Link from 'next/link'

import { authAdmin } from '@/lib/auth-admin'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'

import { MobileMenu } from './nav-mobile'
import { DashboardUserNav } from './nav-user'

export async function SiteHeader() {
  const session = await authAdmin()

  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 w-full border-b border-muted bg-background"
    >
      <div className="flex h-14 items-center gap-3 px-3 md:px-6">
        <div className="grow space-x-3">
          <MobileMenu />
          <Button variant="link" size={'icon'} asChild className="md:hidden">
            <Link href="/">
              <Logo className="size-5" />
            </Link>
          </Button>
        </div>

        <ModeToggle />
        {session?.user && <DashboardUserNav />}
      </div>
    </header>
  )
}
