'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="rounded-full shrink-0"
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <MoonIcon className="size-4 rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
          <SunIcon className="absolute size-4 rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
          <span className="sr-only">Switch Theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Switch Theme</TooltipContent>
    </Tooltip>
  )
}
