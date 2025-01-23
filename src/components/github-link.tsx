import { GitBranch } from "lucide-react"
import Link from "next/link"
import { TooltipContainer } from "~/components/tooltip-container"
import { Button } from "~/components/ui/button"
import { siteConfig } from "~/config/site"

export function GithubLink() {
  return (
    <TooltipContainer>
      <Button
        asChild={true}
        title={"GitHub"}
        variant={"ghost"}
      >
        <Link
          className={"font-mono"}
          href={siteConfig.links.github}
          referrerPolicy={"no-referrer"}
          target={"_blank"}
        >
          <GitBranch className={"mr-1 size-3"} />

          {"main*"}
        </Link>
      </Button>
    </TooltipContainer>
  )
}
