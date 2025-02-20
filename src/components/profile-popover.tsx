"use client"

import { signOut } from "next-auth/react"
import React from "react"
import { Button } from "~/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { useLazyRef } from "~/hooks/use-lazy-ref"
import { getUserSession } from "~/hooks/use-session"

export function ProfilePopover() {
  const userRef = useLazyRef(getUserSession)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <Button variant={"ghost"}>{userRef.current?.lastname}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={"end"}>
        <DropdownMenuLabel>{`${userRef.current?.firstname} ${userRef.current?.lastname}`}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          {"Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
