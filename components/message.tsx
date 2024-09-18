import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

export function Message(props: { children?: ReactNode; className?: string }) {
  return <div className={cn(props.className)}>{props.children}</div>
}

Message.Error = function ErrorMessages(props: {
  children?: ReactNode
  className?: string
}) {
  return <div className={cn(props.className)}>{props.children}</div>
}
