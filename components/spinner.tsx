import { type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Icon, Icons, iconVariants } from '@/components/icons'

export interface SpinnerProps
  extends Omit<Icon, 'size'>,
    Omit<VariantProps<typeof iconVariants>, 'variant'> {
  isSpinning?: boolean
}

export function Spinner({
  size = 'md',
  className,
  children,
  isSpinning,
  ...props
}: SpinnerProps) {
  if (children) {
    if (isSpinning) {
      return (
        <div className="relative">
          {children}
          <div className="absolute inset-0 grid place-content-center bg-background/50">
            <Icons.Spin
              className={cn('animate-spin', iconVariants({ size }), className)}
              {...props}
            />
          </div>
        </div>
      )
    }
    return children
  }

  return (
    <Icons.Spin
      className={cn('animate-spin', iconVariants({ size }), className)}
      {...props}
    />
  )
}

Spinner.FullPage = function FullPageSpinner() {
  return (
    <div className="absolute inset-0 z-[9999] grid max-h-svh place-content-center bg-background/50">
      <Spinner />
    </div>
  )
}
