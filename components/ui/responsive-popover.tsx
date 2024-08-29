import {
  ComponentPropsWithoutRef,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react'

import { cn } from '@/lib/utils'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { DesktopView, MobileView } from '@/components/device'

export function ResponsivePopover(props: {
  align?: ComponentPropsWithoutRef<typeof PopoverContent>['align']
  children?: ReactNode
  classNames?: {
    popoverTrigger?: string
    popoverContent?: string
    drawerTrigger?: string
    drawerContent?: string
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
        <Popover open={props.open} onOpenChange={props.onOpenChange}>
          {isValidElement(props.triggerRender) && (
            <PopoverTrigger
              asChild
              className={cn(props.classNames?.popoverTrigger)}
            >
              {props.triggerRender}
            </PopoverTrigger>
          )}

          <PopoverContent
            align={props.align}
            {...(typeof props.closeOutside === 'boolean' && !props.closeOutside
              ? {
                  onInteractOutside(event) {
                    event.preventDefault()
                  },
                }
              : undefined)}
            className={cn(
              'w-auto max-w-fit border-0 bg-transparent p-0',
              props.classNames?.popoverContent
            )}
          >
            {props.children}
          </PopoverContent>
        </Popover>
      </DesktopView>

      <MobileView>
        <Drawer
          open={props.open}
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
              props.classNames?.drawerContent
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

            {props.children}
          </DrawerContent>
        </Drawer>
      </MobileView>
    </>
  )
}
