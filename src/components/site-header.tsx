import Link from "next/link"
import React from "react"
import { Icons } from "~/components/icons"
import { ThemeToggle } from "~/components/theme-toggle"
import { Button } from "./ui/button"

import { AppNavigation } from "~/components/app-navigation"
import { ProfilePopover } from "~/components/profile-popover"
import { siteConfig } from "~/config/site"
import { auth } from "~/server/auth"
import { cn } from "~/lib/utils"

export async function SiteHeader({
  className,
}: React.ComponentProps<"header">) {
  const session = await auth()
  const isAuth = !!session?.user

  return (
    <header
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur",
        className,
      )}>
      <div className={"flex h-14 items-center gap-8 px-4"}>
        <div className={"flex items-center gap-5"}>
          <Link className={"flex gap-2 font-bold"} href={"/"}>
            <Icons.logo className={"size-6"} />

            {siteConfig.name}
          </Link>

          <ThemeToggle />
        </div>

        <div className={"flex flex-1 items-center justify-end gap-1"}>
          <AppNavigation />

          {isAuth ? (
            <ProfilePopover />
          ) : (
            <Button asChild={true} type={"button"}>
              <Link href={"/login"}>{"Login"}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
