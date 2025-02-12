"use server"

import React from "react"
import { highlightCode } from "~/lib/highlight-code"
import { cn } from "~/lib/utils"

export async function CodeBlock({
  lang,
  code,
  className,
}: {
  lang: string
  code: string
  className?: string
}) {
  const html = await highlightCode({ code, lang })

  return (
    <div
      className={cn(
        "overflow-auto *:!bg-transparent *:p-5 [&_.line]:inline-block [&_.line:empty]:hidden",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
