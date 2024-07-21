'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value?: string
}

export async function copyToClipboardWithMeta(value: string) {
  if (typeof window !== 'undefined') {
    void window.navigator.clipboard.writeText(value)
  }
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    const sto = setTimeout(() => {
      setHasCopied(false)
    }, 2000)

    return () => clearTimeout(sto)
  }, [hasCopied])

  return (
    <Tooltip open={hasCopied ? hasCopied : undefined}>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            'relative z-10 h-6 w-6 text-gray-500 hover:bg-muted',
            className
          )}
          onClick={() => {
            if (value) {
              copyToClipboardWithMeta(value?.toString() ?? '')
              setHasCopied(true)
            } else {
              alert('Not value')
            }
          }}
          type="button"
          {...props}
        >
          {hasCopied ? (
            <Check className="size-3" />
          ) : (
            <Copy className="size-3" />
          )}
          <span className="sr-only">Copy</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{hasCopied ? 'Đã sao chép' : 'Sao chép'}</TooltipContent>
    </Tooltip>
  )
}
