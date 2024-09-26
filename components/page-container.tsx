import React, { forwardRef, HTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

export const MarketingPageContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean
  }
>(function PageContainer({ className, asChild, ...props }, ref) {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      ref={ref}
      className={cn('container max-w-5xl flex-1 pb-20 pt-6 md:pt-9', className)}
      {...props}
    />
  )
})

export const DashboardPageContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean
  }
>(function PageContainer({ className, asChild, ...props }, ref) {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      ref={ref}
      className={cn('container flex-1 py-4', className)}
      {...props}
    />
  )
})
