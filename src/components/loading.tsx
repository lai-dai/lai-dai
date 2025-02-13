import React from "react"
import { Icons } from "~/components/icons"
import { cn } from "~/lib/utils"

export function Loading({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("grid place-content-center", className)} {...props}>
      <Icons.loader />
    </div>
  )
}
