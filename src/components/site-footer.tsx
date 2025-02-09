import Link from "next/link"
import { Icons } from "~/components/icons"
import { siteConfig } from "~/config/site"

export function SiteFooter() {
  return (
    <footer className={"border-grid border-t py-6 md:px-8 md:py-0"}>
      <div className={"container-wrapper"}>
        <div className={"container py-4"}>
          <p
            className={
              "text-balance text-center text-sm leading-loose text-muted-foreground md:text-left"
            }
          >
            {"Made with "}

            <span className={"heart text-red-600 inline-flex"}>
              <Icons.love />
            </span>

            {' and '}

            <Link
              className={"inline-flex"}
              href={"https://nextjs.org"}
              rel={"noopener noreferrer"}
              target={"_blank"}
            >
              <Icons.nextjs />
            </Link>


            {". The source code is available on"}{" "}

            <a
              className={"font-medium underline underline-offset-4"}
              href={siteConfig.links.github}
              rel={"noreferrer"}
              target={"_blank"}
            >
              {"GitHub"}
            </a>

            {"."}
          </p>
        </div>
      </div>
    </footer>
  )
}
