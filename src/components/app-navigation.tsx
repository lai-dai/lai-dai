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

type MenuItem = {
  id: number
  title: string
  url: string
  target: string
  children?: MenuItem[]
}

const menuList: MenuItem[] = [
  {
    id: 1,
    title: "Home",
    url: "/",
    target: "_self",
  },
  {
    id: 8,
    title: "Blog",
    url: "/blog",
    target: "_self",
  },
  {
    id: 9,
    title: "About",
    url: "/about",
    target: "_self",
  },
]

export function AppNavigation() {
  return (
    <NavigationMenu className={"hidden md:flex"}>
      <NavigationMenuList>
        {menuList.map(menu => {
          if ("children" in menu) {
            return (
              <GroupItems
                items={menu.children}
                key={`group-${menu.id}`}
              >
                {menu.title}
              </GroupItems>
            )
          }

          return (
            <NavLink
              key={`item-${menu.id}`}
              url={menu.url}
            >
              {menu.title}
            </NavLink>
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
  items?: MenuItem[]
}) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{children}</NavigationMenuTrigger>

      <NavigationMenuContent
        className={"absolute left-auto top-full !animate-none border"}
      >
        <ul>
          {items?.map(menu => (
            <NavLink
              key={menu.id}
              target={menu.target}
              url={menu.url}
            >
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
  url,
  target,
}: {
  children?: React.ReactNode
  url?: string
  target?: React.HTMLAttributeAnchorTarget
}) => {
  const pathname = usePathname()

  return (
    <NavigationMenuItem>
      <Link
        href={url ?? "#"}
        legacyBehavior={true}
        passHref={true}
        target={target}
      >
        <NavigationMenuLink
          active={
            pathname === "/" ? url === pathname : url?.startsWith(pathname)
          }
          className={cn(navigationMenuTriggerStyle(), "block w-full")}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}
