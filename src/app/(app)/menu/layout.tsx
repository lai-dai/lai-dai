import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"
import { getConfigs } from "~/actions/config"
import { getMenu } from "~/actions/menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu"
import { type components } from "~/lib/api/strapi"
import { cn } from "~/lib/utils"

// export const revalidate = 3600 // 1h
export const revalidate = 30 // 30s

export default async function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const configs = await getConfigs()

  if (!configs?.config_menu?.documentId) {
    return notFound()
  }

  const menuList = await getMenu(configs?.config_menu?.documentId)

  if (!menuList) {
    return notFound()
  }

  return (
    <div className={"py-6"}>
      <NavigationMenu className={"mx-auto"}>
        <NavigationMenuList>
          {menuList?.items?.map(menu => {
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

      {children}
    </div>
  )
}

const GroupItems = ({
  children,
  items,
}: {
  children?: React.ReactNode
  items?: components["schemas"]["MenuGroupComponent"]["children"]
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
  return (
    <NavigationMenuItem>
      <Link
        href={url ?? "#"}
        legacyBehavior={true}
        passHref={true}
        target={target}
      >
        <NavigationMenuLink
          className={cn(navigationMenuTriggerStyle(), "block w-full")}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}
