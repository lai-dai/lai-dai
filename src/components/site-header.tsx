"use client"

import Link from "next/link"
import React from "react"
import { GithubLink } from "./github-link"
import { Icons } from "./icons"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { siteConfig } from "~/config/site"

export function SiteHeader() {
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
          <div className={"mr-4 flex flex-1 items-center gap-2 lg:mr-6"}>
            <Button className={"mr-1 md:hidden"}>{"Menu"}</Button>

            <Link
              className={"hidden md:flex"}
              href={"https://ui.shadcn.com/"}
              referrerPolicy={"no-referrer"}
            >
              <Icons.logo className={"size-5"} />
            </Link>

            <Link
              className={"font-bold"}
              href={"/"}
            >
              {siteConfig.name}
            </Link>
          </div>

          <div className={"flex items-center gap-1"}>
            <GithubLink />

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
