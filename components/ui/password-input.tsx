'use client'

import React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input, InputProps } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    startContent?: React.ReactNode
  }
>(function PasswordInput({ startContent, ...props }, ref) {
  const [isPassword, setIsPassword] = React.useState(true)

  const IconPassword = isPassword ? EyeOff : Eye

  return (
    <div className="relative">
      {startContent}
      <Input
        {...props}
        ref={ref}
        type={isPassword ? 'password' : 'text'}
        className={cn('pr-12', props.className)}
      />
      <Button
        onClick={() => setIsPassword(!isPassword)}
        type="button"
        size={'icon'}
        variant={'ghost'}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-transparent"
      >
        <IconPassword className={'text-gray-500 size-4'} />
      </Button>
    </div>
  )
})
