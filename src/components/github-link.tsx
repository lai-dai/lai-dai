import { GitBranch } from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"
import { siteConfig } from "~/config/site"

export function GithubLink() {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <Link
            className={"flex items-center text-sm font-mono"}
            href={siteConfig.links.github}
            referrerPolicy={"no-referrer"}
            target={"_blank"}
          >
            <GitBranch className={"mr-1 size-3"} />

            {"main*"}
          </Link>
        </TooltipTrigger>

        <TooltipContent>
          <p>{"GitHub"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
