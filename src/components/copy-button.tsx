"use client"

import { CheckIcon, ClipboardIcon } from "lucide-react"
import React from "react"

import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"

export async function copyToClipboardWithMeta(value: string) {
  try {
    await navigator.clipboard.writeText(value)
  } catch (error) {
    console.error("🚀 error", error)
  }
}

export function CopyButton({
  value,
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string
}) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 1500)
  }, [hasCopied])

  return (
    <Button
      className={cn(
        "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3",
        className,
      )}
      onClick={async () => {
        await copyToClipboardWithMeta(value)
        setHasCopied(true)
      }}
      size={"icon"}
      variant={"ghost"}
      {...props}>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}

      <span className={"sr-only"}>{"Copy"}</span>
    </Button>
  )
}
