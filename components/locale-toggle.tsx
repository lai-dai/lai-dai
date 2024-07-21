'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Languages } from 'lucide-react'
import { useLocale } from 'next-intl'

import { Locale } from '@/config/site'
import { setUserLocale } from '@/lib/actions/locale'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const langs = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'vi',
    label: 'Vietnamese',
  },
]

export function LocaleToggle() {
  const [open, setOpen] = React.useState(false)
  const [, startTransition] = React.useTransition()
  const locale = useLocale()

  function onChange(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open}>
          <Languages className="size-5" />
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-fit p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {langs.map((lang) => (
                <CommandItem
                  key={lang.value}
                  value={lang.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue)
                    setOpen(false)
                  }}
                  className="justify-between"
                >
                  {lang.label}
                  <Check
                    className={cn(
                      'ml-2 h-4 w-4',
                      locale === lang.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
