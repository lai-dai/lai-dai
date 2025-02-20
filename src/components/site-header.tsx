import Link from "next/link"
import React from "react"
import { Icons } from "~/components/icons"

import { AppNavigation, MenuEntry } from "~/components/app-navigation"
import { siteConfig } from "~/config/site"
import { cn } from "~/lib/utils"
// import { Button } from "./ui/button"
// import { ProfilePopover } from "~/components/profile-popover"
// import { getUserSession } from "~/hooks/use-session"
// import { useLazyRef } from "~/hooks/use-lazy-ref"

const menuList: MenuEntry[] = [
  {
    id: 1,
    title: "Home",
    url: "/",
    target: "_self",
  },
  {
    id: 8,
    title: "Docs",
    url: "/docs",
    target: "_self",
  },
  {
    id: 10,
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

export function SiteHeader({ className }: React.ComponentProps<"header">) {
  // const userRef = useLazyRef(getUserSession)
  // const isAuth = !!userRef.current

  return (
    <header
      className={cn(
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}>
      <div className={"flex h-full items-center gap-8 px-4"}>
        <div className={"flex items-center gap-5"}>
          <Link className={"flex gap-2 font-bold"} href={"/"}>
            <Icons.logo className={"size-6"} />

            {siteConfig.name}
          </Link>
        </div>

        <div className={"flex flex-1 items-center justify-end gap-1"}>
          <AppNavigation menuList={menuList} />

          {/* {isAuth ? (
            <ProfilePopover />
          ) : (
            <Button asChild={true} type={"button"}>
              <Link href={"/login"}>{"Login"}</Link>
            </Button>
          )} */}
        </div>
      </div>
    </header>
  )
}
