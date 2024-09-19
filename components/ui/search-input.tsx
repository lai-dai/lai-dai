'use client'

import { Search, X } from 'lucide-react'

import { useUncontrolled } from '@/lib/hooks/use-uncontrolled'
import { cn } from '@/lib/utils'
import { chain } from '@/lib/utils/chain'

import { Button } from './button'
import { Input, InputProps } from './input'

export function SearchInput({
  classNames,
  onSearchChange,
  onValueChange,
  onKeyDown,
  className,
  value,
  defaultValue,
  ...props
}: Omit<InputProps, 'value' | 'defaultValue'> & {
  value?: string
  defaultValue?: string
  onSearchChange?: (value?: string) => void
  onValueChange?: (value?: string) => void
  classNames?: {
    root?: string
    wrapper?: string
    input?: string
  }
}) {
  const [_value, setValue] = useUncontrolled<string | undefined>({
    defaultValue,
    value,
    onValueChange,
  })
  return (
    <div className={cn('flex gap-3', classNames?.root)}>
      <div className={cn('relative', classNames?.wrapper)}>
        <Input
          value={_value || ''}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          onKeyDown={chain(onKeyDown, (e) => {
            if (e.code === 'Enter') {
              e.preventDefault()
              onSearchChange?.(_value || undefined)
            }
          })}
          className={cn('pr-9', classNames?.input, className)}
          {...props}
        />
        {_value && (
          <Button
            onClick={() => {
              onSearchChange?.(undefined)
              setValue(undefined)
            }}
            size={'icon'}
            className="absolute right-3 top-1/2 size-4 -translate-y-1/2"
          >
            <X className="size-3" />
          </Button>
        )}
      </div>
      <Button
        onClick={() => onSearchChange?.(_value || undefined)}
        size={'icon'}
        variant={'outline'}
      >
        <Search className="size-4" />
      </Button>
    </div>
  )
}
