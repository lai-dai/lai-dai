import React from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"
import { delve } from "~/utils/delve"

interface TooltipContainerProps {
  children: React.ReactElement
  title?: React.ReactNode
  content?: React.ReactNode
  align?: "center" | "end" | "start"
  side?: "top" | "right" | "bottom" | "left"
}

export function TooltipContainer({
  children,
  title,
  content,
  align,
  side,
}: TooltipContainerProps) {
  const text = title ?? delve(children.props as object, "title") ?? null

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild={true}>{children}</TooltipTrigger>

        <TooltipContent align={align} side={side}>
          {content ?? text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
