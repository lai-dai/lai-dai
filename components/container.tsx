import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export function PageContainer(props: {
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('container', props.className)}>{props.children}</div>
  )
}
