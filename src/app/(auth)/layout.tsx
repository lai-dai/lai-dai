import React from "react"
import { PreviewPageButton } from "~/components/preview-page-button"
import { SiteFooter } from "~/components/site-footer"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={"flex h-screen max-h-screen flex-col overflow-auto"}>
      <div className={"border-grid border-b"}>
        <div className={"container-wrapper"}>
          <PreviewPageButton />
        </div>
      </div>

      {children}

      <SiteFooter />
    </div>
  )
}
