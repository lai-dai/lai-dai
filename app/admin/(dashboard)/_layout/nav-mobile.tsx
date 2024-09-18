import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Logo } from '@/components/logo'

import { Menu } from './menu'

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="shrink-0 md:hidden" variant="outline" size="icon">
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col px-3 sm:w-72" side="left">
        <SheetHeader>
          <Button variant="link" asChild>
            <Link href="/">
              <Logo className="mr-3 size-5" />
              <h1 className="text-lg font-bold">{siteConfig.name}</h1>
            </Link>
          </Button>
        </SheetHeader>
        <Menu />
      </SheetContent>
    </Sheet>
  )
}
