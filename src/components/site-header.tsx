"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type Session } from "next-auth"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import React from "react"
import { GithubLink } from "./github-link"
import { Icons } from "./icons"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu"
import { siteConfig } from "~/config/site"
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
    title: 'Home',
    url: '/',
    target: '_self'
  },
  {
    id: 8,
    title: 'Blog',
    url: '/blog',
    target: '_self'
  },
  {
    id: 9,
    title: 'About',
    url: '/about',
    target: '_self'
  }
]

export function SiteHeader({
  session: sessionProp,
}: {
  session?: Session | null
}) {
  const router = useRouter()
  const { data: session } = useSession()
  const isAuth = sessionProp ?? !!session?.user

  const [isSticky, setIsSticky] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={
        "border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }
      data-sticky={isSticky}
    >
      <div className={"container-wrapper"}>
        <div className={"container flex h-16"}>
          <div className={"mr-4 flex items-center gap-2 lg:mr-6"}>
            <Icons.logo className={"size-5"} />

            <Link
              className={"font-bold"}
              href={"/"}
            >
              {siteConfig.name}
            </Link>
          </div>

          <div className={"flex-1 flex items-center"}>
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
          </div>

          <div className={"flex items-center gap-1"}>
            {isAuth ? (
              <Button
                onClick={() => signOut()}
                type={"button"}
              >
                {"Logout"}
              </Button>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                type={"button"}
              >
                {"Login"}
              </Button>
            )}

            <GithubLink />

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
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
