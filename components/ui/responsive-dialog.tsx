import React from 'react'
import { cn } from '@/lib/utils'
import { isDesktop } from '@/components/device-detect'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Drawer as DrawerPrimitive } from 'vaul'
import { Cross2Icon } from '@radix-ui/react-icons'

export function Dialog({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> &
  React.ComponentProps<typeof DrawerPrimitive.Root>) {
  if (isDesktop) {
    return <DialogPrimitive.Root {...props} />
  }
  return (
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  )
}

export const DialogTrigger = isDesktop
  ? DialogPrimitive.Trigger
  : DrawerPrimitive.Trigger

export const DialogPortal = isDesktop
  ? DialogPrimitive.Portal
  : DrawerPrimitive.Portal

export const DialogClose = isDesktop
  ? DialogPrimitive.Close
  : DrawerPrimitive.Close

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay> &
    React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> &
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  if (isDesktop) {
    return (
      <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
          'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          className
        )}
        {...props}
      />
    )
  }
  return (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn('fixed inset-0 z-50 bg-black/80', className)}
      {...props}
    />
  )
})

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content> &
    React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(function DialogContent({ className, children, ...props }, ref) {
  return (
    <DialogPortal>
      <DialogOverlay />
      {isDesktop ? (
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-h-svh overflow-y-auto',
            className
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      ) : (
        <DrawerPrimitive.Content
          ref={ref}
          className={cn(
            'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
            className
          )}
          {...props}
        >
          <div className="max-h-svh overflow-y-auto">
            <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
            {children}
          </div>
        </DrawerPrimitive.Content>
      )}
    </DialogPortal>
  )
})

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  if (isDesktop) {
    return (
      <div
        className={cn(
          'flex flex-col space-y-1.5 text-center sm:text-left',
          className
        )}
        {...props}
      />
    )
  }
  return (
    <div
      className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
      {...props}
    />
  )
}

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  if (isDesktop) {
    return (
      <div
        className={cn(
          'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
          className
        )}
        {...props}
      />
    )
  }
  return (
    <div
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title> &
    React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> &
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  if (isDesktop) {
    return (
      <DialogPrimitive.Title
        ref={ref}
        className={cn(
          'text-lg font-semibold leading-none tracking-tight',
          className
        )}
        {...props}
      />
    )
  }
  return (
    <DrawerPrimitive.Title
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  )
})

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description> &
    React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> &
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => {
  if (isDesktop) {
    return (
      <DialogPrimitive.Description
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
      />
    )
  }
  return (
    <DrawerPrimitive.Description
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
})
