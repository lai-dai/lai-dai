'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Dot, LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

type Submenu = {
  href: string
  label: string
  active: boolean
}

interface CollapseMenuButtonProps {
  icon: LucideIcon
  label: string
  active: boolean
  submenus: Submenu[]
  href: string
}

export function CollapseMenuButton({
  icon: Icon,
  label,
  active,
  submenus,
  href,
}: CollapseMenuButtonProps) {
  const isSubmenuActive = submenus.some((submenu) => submenu.active)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive)

  return (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
      <div
        className={cn(
          buttonVariants({ variant: active ? 'secondary' : 'ghost' }),
          'mb-1 h-10 w-full justify-start'
        )}
      >
        <Link
          onClick={() => setIsCollapsed(true)}
          href={href || '#'}
          className="flex flex-1 items-center"
        >
          <span className="mr-4">
            <Icon size={18} />
          </span>
          <h4
            className={cn('max-w-[150px] translate-x-0 truncate opacity-100')}
          >
            {label}
          </h4>
        </Link>
        <CollapsibleTrigger
          className="[&[data-state=open]>svg]:rotate-180"
          asChild
        >
          <Button variant={'ghost'} size={'icon'}>
            <ChevronDown className="size-4 transition-transform duration-200" />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus.map(({ href, label, active }, index) => (
          <Button
            key={index}
            variant={active ? 'secondary' : 'ghost'}
            className="mb-1 h-10 w-full justify-start"
            asChild
          >
            <Link href={href}>
              <span className="ml-2 mr-4">
                <Dot size={18} />
              </span>
              <p
                className={cn(
                  'max-w-[170px] translate-x-0 truncate opacity-100'
                )}
              >
                {label}
              </p>
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
