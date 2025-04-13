"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu"
import { cn } from "~/lib/utils"
import { NavItemWithChildren } from "~/types/nav"

export function AppNavigation({
  navItems,
}: {
  navItems: NavItemWithChildren[]
}) {
  return (
    <NavigationMenu className={"hidden md:flex"}>
      <NavigationMenuList>
        {navItems.map(menu => {
          if (!menu?.items?.length) {
            return (
              <NavLink key={`item-${menu.title}`} href={menu.href}>
                {menu.title}
              </NavLink>
            )
          }

          return (
            <GroupItems items={menu.items} key={`group-${menu.title}`}>
              {menu.title}
            </GroupItems>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const GroupItems = ({
  children,
  items,
}: {
  children?: React.ReactNode
  items?: NavItemWithChildren[]
}) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{children}</NavigationMenuTrigger>

      <NavigationMenuContent
        className={"absolute left-auto top-full !animate-none border"}>
        <ul>
          {items?.map(menu => (
            <NavLink key={menu.title} href={menu.href}>
              {menu.title}
            </NavLink>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

const NavLink = ({
  children,
  href,
  target,
}: {
  children?: React.ReactNode
  href?: string
  target?: React.HTMLAttributeAnchorTarget
}) => {
  const pathname = usePathname()

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        active={
          pathname === "/" ? href === pathname : href?.startsWith(pathname)
        }
        className={cn(navigationMenuTriggerStyle(), "block w-full")}>
        <Link href={href ?? "#"} prefetch target={target}>
          {children}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
