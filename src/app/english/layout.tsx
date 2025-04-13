import React from "react"
import { AppInitializer } from "~/components/app-initializer"
import { AppSidebar } from "~/components/app-sidebar"
import { SidebarProvider } from "~/components/ui/sidebar"
import { englishConfig } from "~/config/english"
import { env } from "~/env"
import { auth } from "~/server/auth"

export default async function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <SidebarProvider
      className="mx-auto min-h-dvh max-w-7xl border-dashed xl:border-x"
      data-wrapper={""}
      style={
        {
          "--sidebar-width": "20rem",
        } as React.CSSProperties
      }>
      <div
        className={
          "flex-1 items-start md:grid md:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] md:gap-6 lg:gap-10"
        }>
        <AppSidebar navItems={englishConfig.grammarNav} />

        <AppInitializer
          suffixDefaultAccessKey={env.SUFFIX_DEFAULT_ACCESS_KEY}
          session={session}
        />

        {children}
      </div>
    </SidebarProvider>
  )
}
