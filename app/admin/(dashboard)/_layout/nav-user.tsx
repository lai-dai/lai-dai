import React from 'react'
import { LogOut } from 'lucide-react'

import { authAdmin } from '@/lib/auth-admin'
import { firstLetterBuilder } from '@/lib/utils/first-letter-builder'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'
import { LogoutButton } from '@/components/logout-button'

export async function DashboardUserNav() {
  const session = await authAdmin()
  // const currentAvatar = AVATARS.find(
  //   (item) => item.name === session?.user.image
  // )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {/* <AvatarImage
              src={currentAvatar?.image}
              alt={session?.user?.name || ''}
            /> */}
            <AvatarFallback>
              {firstLetterBuilder(session?.user?.firstname)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem asChild>
          <LogoutButton
            variant={'ghost'}
            className="w-full cursor-pointer justify-start"
          >
            <Spinner
              size={'xs'}
              className="mr-3 group-data-[pending=false]:hidden"
            />
            <LogOut className="mr-3 size-4 group-data-[pending=true]:hidden" />
            Log out
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
