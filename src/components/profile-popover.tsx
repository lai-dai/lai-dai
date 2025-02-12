"use client"

import { useSession } from "next-auth/react"
import React from "react"
import { submitLogout } from "~/actions/auth"
import { Button } from "~/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

function handleLogout() {
  "use client"
  submitLogout()
}

export function ProfilePopover() {
  const { data: session } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <Button variant={"ghost"}>{session?.user.lastname}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={"end"}>
        <DropdownMenuLabel>{`${session?.user.firstname} ${session?.user.lastname}`}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => handleLogout()}>
          {"Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
