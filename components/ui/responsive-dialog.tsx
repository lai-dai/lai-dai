import { isValidElement, ReactElement } from 'react'

import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { DesktopView, MobileView } from '@/components/device'

export function ResponsiveDialog(props: {
  children?: React.ReactNode
  classNames?: {
    dialogContent?: string
    drawerTrigger?: string
    drawerContent?: string
    dialogTrigger?: string
    dialogTitle?: string
    dialogDescription?: string
    dialogHeader?: string
    drawerTitle?: string
    drawerDescription?: string
    drawerHeader?: string
  }
  closeOutside?: boolean
  description?: React.ReactNode
  onOpenChange?: (open: boolean) => void
  open?: boolean
  title?: React.ReactNode
  triggerRender?: ReactElement
}) {
  return (
    <>
      <DesktopView>
        <Dialog open={props?.open} onOpenChange={props?.onOpenChange}>
          {isValidElement(props.triggerRender) && (
            <DialogTrigger
              asChild
              className={cn(props.classNames?.dialogTrigger)}
            >
              {props.triggerRender}
            </DialogTrigger>
          )}

          <DialogContent
            {...(typeof props.closeOutside === 'boolean' && !props.closeOutside
              ? {
                  onInteractOutside(event) {
                    event.preventDefault()
                  },
                }
              : undefined)}
            className={cn(
              'max-w-fit border-0 bg-transparent p-0',
              props?.classNames?.dialogContent
            )}
          >
            {props?.title ? (
              <DialogHeader className={cn(props.classNames?.dialogHeader)}>
                {props?.title && (
                  <DialogTitle className={cn(props.classNames?.dialogTitle)}>
                    {props?.title}
                  </DialogTitle>
                )}
                {props.description && (
                  <DialogDescription
                    className={cn(props.classNames?.dialogDescription)}
                  >
                    {props.description}
                  </DialogDescription>
                )}
              </DialogHeader>
            ) : (
              <VisuallyHidden>
                <DialogHeader>
                  <DialogTitle />
                  <DialogDescription />
                </DialogHeader>
              </VisuallyHidden>
            )}

            {props?.children}
          </DialogContent>
        </Dialog>
      </DesktopView>

      <MobileView>
        <Drawer
          open={props?.open}
          {...(typeof props.closeOutside === 'boolean' && !props.closeOutside
            ? {
                onClose() {
                  props?.onOpenChange?.(false)
                },
              }
            : {
                onOpenChange: props.onOpenChange,
              })}
        >
          {isValidElement(props.triggerRender) && (
            <DrawerTrigger
              asChild
              className={cn(props.classNames?.drawerTrigger)}
            >
              {props.triggerRender}
            </DrawerTrigger>
          )}

          <DrawerContent
            className={cn(
              '[&>*:nth-child(3)]:mx-auto',
              props?.classNames?.drawerContent
            )}
          >
            {props?.title ? (
              <DrawerHeader className={cn(props.classNames?.drawerHeader)}>
                {props?.title && (
                  <DrawerTitle className={cn(props.classNames?.drawerTitle)}>
                    {props?.title}
                  </DrawerTitle>
                )}
                {props.description && (
                  <DrawerDescription
                    className={cn(props.classNames?.drawerDescription)}
                  >
                    {props.description}
                  </DrawerDescription>
                )}
              </DrawerHeader>
            ) : (
              <VisuallyHidden>
                <DrawerHeader>
                  <DrawerTitle />
                  <DrawerDescription />
                </DrawerHeader>
              </VisuallyHidden>
            )}

            {props?.children}
          </DrawerContent>
        </Drawer>
      </MobileView>
    </>
  )
}
