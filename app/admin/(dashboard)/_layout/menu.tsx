'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { CollapseMenuButton } from './collapse-menu-button'
import { getMenuList } from './menu-list'

export function Menu() {
  const pathname = usePathname()
  const menuList = getMenuList(pathname)

  return (
    <nav className="size-full">
      <ul className="flex flex-col space-y-1 px-2">
        {menuList.map(({ groupLabel, menus }, index) => (
          <li className={cn('w-full', groupLabel && 'pt-5')} key={index}>
            {groupLabel ? (
              <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                {groupLabel}
              </p>
            ) : (
              <p className="pb-2"></p>
            )}
            {menus.map(
              ({ href, label, icon: Icon, active, submenus }, index) =>
                submenus.length === 0 ? (
                  <div className="w-full" key={index}>
                    <Button
                      variant={active ? 'secondary' : 'ghost'}
                      className="mb-1 h-10 w-full justify-start"
                      asChild
                    >
                      <Link href={href}>
                        <span className={'mr-4'}>
                          <Icon size={18} />
                        </span>
                        <p
                          className={cn(
                            'max-w-[200px] translate-x-0 truncate opacity-100'
                          )}
                        >
                          {label}
                        </p>
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton
                      icon={Icon}
                      label={label}
                      active={active}
                      submenus={submenus}
                      href={href}
                    />
                  </div>
                )
            )}
          </li>
        ))}
        {/* <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {}}
                    variant="outline"
                    className="w-full justify-center h-10 mt-5"
                  >
                    <span className={cn(isOpen === false ? '' : 'mr-4')}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        'whitespace-nowrap',
                        isOpen === false ? 'opacity-0 hidden' : 'opacity-100'
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li> */}
      </ul>
    </nav>
  )
}
