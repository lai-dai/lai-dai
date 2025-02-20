import Link from "next/link"
import { Icons } from "~/components/icons"
import { ThemeToggle } from "~/components/theme-toggle"
import { siteConfig } from "~/config/site"
import { cn } from "~/lib/utils"

export function SiteFooter({ className }: React.ComponentProps<"footer">) {
  return (
    <footer className={cn("px-4 py-6 md:px-6 lg:px-8", className)}>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p
          className={
            "text-balance text-center text-sm leading-loose text-muted-foreground md:text-left"
          }>
          {"Made with "}
          <span className={"heart inline-flex text-red-600"}>
            <Icons.love />
          </span>
          {" and "}
          <Link
            className={"inline-flex"}
            href={"https://nextjs.org"}
            rel={"noopener noreferrer"}
            target={"_blank"}>
            <Icons.nextjs />
          </Link>
          {". The source code is available on"}{" "}
          <a
            className={"font-medium underline underline-offset-4"}
            href={siteConfig.links.github}
            rel={"noreferrer"}
            target={"_blank"}>
            {"GitHub"}
          </a>
          {"."}
        </p>

        <ThemeToggle />
      </div>
    </footer>
  )
}
