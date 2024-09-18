import React from 'react'
import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'

import { Menu } from './menu'

export function SiteAside() {
  return (
    <aside className="sticky top-0 z-50 hidden h-screen w-64 flex-col border-r border-muted bg-background md:flex">
      <div className="flex h-14 items-center px-2">
        <Button variant="link" asChild>
          <Link href="/" className="hover:no-underline">
            <Logo className="mr-3 size-5" />
            <h1
              className={cn(
                'translate-x-0 whitespace-nowrap text-lg font-bold opacity-100 transition-[transform,opacity,display] duration-300 ease-in-out'
              )}
            >
              {siteConfig.name}
            </h1>
          </Link>
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <Menu />
      </div>
    </aside>
  )
}
