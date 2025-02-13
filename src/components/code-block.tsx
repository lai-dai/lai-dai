"use client"

import React from "react"
import { highlightCode } from "~/lib/highlight-code"
import { Skeleton } from "~/components/ui/skeleton"

export async function CodeBlock({
  lang,
  code,
  initialCode,
}: {
  lang: string
  code: string
  initialCode?: JSX.Element
}) {
  const [nodes, setNodes] = React.useState(initialCode)
  const [error, setError] = React.useState()

  React.useLayoutEffect(() => {
    highlightCode({
      code,
      lang,
    })
      .then(setNodes)
      .catch(setError)
  }, [code, lang])

  return error
    ? (error as Error).message
    : (nodes ?? <Skeleton className="h-8" />)
}
