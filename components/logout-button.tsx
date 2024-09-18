'use client'

import React, { useState } from 'react'
import { signOut } from 'next-auth/react'

import { cn } from '@/lib/utils'
import { chain } from '@/lib/utils/chain'

import { Button, ButtonProps } from './ui/button'

export const LogoutButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function LogoutButton({ onClick, className, ...props }, ref) {
    const [open, setOpen] = useState(false)

    return (
      <Button
        ref={ref}
        onClick={chain(onClick, async () => {
          setOpen(true)
          await signOut({ callbackUrl: '/' })
          setOpen(false)
        })}
        className={cn('group', className)}
        data-pending={open}
        {...props}
      />
    )
  }
)
