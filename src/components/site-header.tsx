import Link from "next/link"
import React from "react"
import { Icons } from "./icons"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"

import { AppNavigation } from "~/components/app-navigation"
import { ProfilePopover } from "~/components/profile-popover"
import { Separator } from "~/components/ui/separator"
import { siteConfig } from "~/config/site"
import { auth } from "~/server/auth"

export async function SiteHeader() {
  const session = await auth()
  const isAuth = !!session?.user

  return (
    <header
      className={
        "border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }
    >
      <div className={"container-wrapper"}>
        <div className={"container flex h-16"}>
          <div className={"mr-5 flex items-center"}>
            <Link
              className={"flex gap-2 font-bold"}
              href={"/"}
            >
              <Icons.logo className={"size-6"} />

              {siteConfig.name}
            </Link>
          </div>

          <div className={"flex items-center"}>
            <ThemeToggle />
          </div>

          <div className={"flex flex-1 items-center justify-end gap-1"}>
            <AppNavigation />

            <Separator
              className={"h-5"}
              orientation={"vertical"}
            />

            {isAuth ? (
              <ProfilePopover />
            ) : (
              <Button
                asChild={true}
                type={"button"}
              >
                <Link href={"/login"}>{"Login"}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
