import React from "react"
import { PhotoProvider } from "~/components/photo-view"
import { SelectionTextPopover } from "~/components/selection-text-popover"
import { SiteFooter } from "~/components/site-footer"
import { SiteHeader } from "~/components/site-header"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={"border-grid flex flex-1 flex-col"} data-wrapper={""}>
      <SiteHeader />

      <PhotoProvider>
        <main className={"flex flex-1 flex-col"}>{children}</main>
      </PhotoProvider>

      <SiteFooter />

      <SelectionTextPopover />
    </div>
  )
}
