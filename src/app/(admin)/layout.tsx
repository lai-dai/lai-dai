import React from "react"
import { AppInitializer } from "~/components/app-initializer"
import { AppProviders } from "~/components/app-providers"
import { PhotoProvider } from "~/components/photo-view"
import { SelectionTextPopover } from "~/components/selection-text-popover"
import { SiteHeader } from "~/components/site-header"
import { env } from "~/env"
import { auth } from "~/server/auth"

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <AppInitializer
      suffixDefaultAccessKey={env.SUFFIX_DEFAULT_ACCESS_KEY}
      session={session}>
      <AppProviders session={session}>
        <div vaul-drawer-wrapper={""}>
          <div
            className={
              "relative isolate flex min-h-screen flex-col bg-background"
            }>
            {children}
          </div>
        </div>
      </AppProviders>
    </AppInitializer>
  )

  return (
    <div className={"border-grid flex flex-1 flex-col"} data-wrapper={""}>
      <div className="fixed inset-x-0 top-0 z-10 border-b border-dashed bg-background">
        <SiteHeader className="mx-auto max-w-7xl border-dashed xl:border-x" />
      </div>

      <PhotoProvider>
        <main className={"flex flex-1 flex-col"}>{children}</main>
      </PhotoProvider>

      <SelectionTextPopover />
    </div>
  )
}
