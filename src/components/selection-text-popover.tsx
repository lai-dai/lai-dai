"use client"

import {
  useFloating,
  autoUpdate,
  flip,
  shift,
  useDismiss,
  useInteractions,
  inline,
} from "@floating-ui/react"
import { usePathname } from "next/navigation"
import React from "react"
import { Card } from "~/components/ui/card"
import { Sheet, SheetContent } from "~/components/ui/sheet"
import { useIsMobile } from "~/hooks/use-mobile"

function getSelectionText() {
  let text = ""
  const activeEl = document.activeElement
  const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null

  if (
    activeElTagName == "textarea" ||
    (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(
        (activeEl as HTMLInputElement).type,
      ) &&
      typeof (activeEl as HTMLInputElement).selectionStart == "number")
  ) {
    text = (activeEl as HTMLInputElement).value.slice(
      (activeEl as HTMLInputElement).selectionStart!,
      (activeEl as HTMLInputElement).selectionEnd!,
    )
  } else if (window.getSelection) {
    text = window.getSelection()?.toString() ?? ""
  }

  return text
}

export function SelectionTextPopover() {
  const [open, setOpen] = React.useState(false)
  const [key, setKey] = React.useState("")

  const isMobile = useIsMobile()
  const pathname = usePathname()

  const { refs, floatingStyles, context } = useFloating({
    open: open,
    onOpenChange: setOpen,
    middleware: [inline(), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  const dismiss = useDismiss(context)

  const { getFloatingProps } = useInteractions([dismiss])

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  React.useEffect(() => {
    function handleMouseUp(event: MouseEvent | ToggleEvent | TouchEvent) {
      if (refs.floating.current?.contains(event.target as Element | null)) {
        return
      }

      setTimeout(() => {
        const selection = window.getSelection()
        const range =
          typeof selection?.rangeCount === "number" && selection.rangeCount > 0
            ? selection.getRangeAt(0)
            : null

        if (selection?.isCollapsed) {
          setOpen(false)
          return
        }

        if (range) {
          refs.setReference({
            getBoundingClientRect: () => range.getBoundingClientRect(),
            getClientRects: () => range.getClientRects(),
          })
          const text = getSelectionText().trim()
          const isSentence = /\s/.test(text)

          if (!isSentence && text) {
            setKey(text)
            setOpen(true)
          }
        }
      })
    }

    function handleMouseDown(event: MouseEvent | ToggleEvent | TouchEvent) {
      if (refs.floating.current?.contains(event.target as Element | null)) {
        return
      }

      if (window.getSelection()?.isCollapsed) {
        setOpen(false)
      }
    }

    if (isMobile) {
      window.addEventListener("touchend", handleMouseUp)
      window.addEventListener("touchstart", handleMouseDown)
    } else {
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("mousedown", handleMouseDown)
    }

    return () => {
      if (isMobile) {
        window.removeEventListener("touchend", handleMouseUp)
        window.removeEventListener("touchstart", handleMouseDown)
      } else {
        window.removeEventListener("mouseup", handleMouseUp)
        window.removeEventListener("mousedown", handleMouseDown)
      }
    }
  }, [isMobile, refs])

  if (isMobile) {
    return (
      <Sheet open={open}>
        <SheetContent className={"max-h-[90vh] overflow-y-auto"}>
          {key}

          {/* <WordView
            className={'border-0'}
            enabled={true}
            gcTime={0}
            key={key}
            queryKey={['floating', key]}
            staleTime={0}
            word={key.toLowerCase()}
          /> */}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    open && (
      <div
        style={{
          ...floatingStyles,
          paddingTop: 20,
        }}
        ref={refs.setFloating}
        {...getFloatingProps()}
      >
        <Card className={"max-h-[50vh] max-w-96 overflow-y-auto shadow-none"}>
          {key}

          {/* <WordView
            className={'border-0'}
            enabled={true}
            gcTime={0}
            key={key}
            queryKey={['floating', key]}
            staleTime={0}
            word={key.toLowerCase()}
          /> */}
        </Card>
      </div>
    )
  )
}
