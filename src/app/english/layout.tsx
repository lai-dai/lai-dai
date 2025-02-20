import React from "react"
import { AppInitializer } from "~/components/app-initializer"
import { AppSidebar, MenuEntry } from "~/components/app-sidebar"
import { SidebarProvider } from "~/components/ui/sidebar"
import { env } from "~/env"
import { auth } from "~/server/auth"

const menuList: MenuEntry[] = [
  {
    title: "Grammar",
    url: "/english",
    children: [
      {
        title: "For Beginners",
        url: "/english/grammar?level=1",
      },
      {
        title: "For Advancers",
        url: "/english/grammar?level=2",
      },
    ],
  },
]

export default async function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <SidebarProvider
      className="mx-auto min-h-dvh max-w-7xl border-dashed xl:border-x"
      data-wrapper={""}>
      <div
        className={
          "flex-1 items-start md:grid md:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] md:gap-6 lg:gap-10"
        }>
        <AppSidebar menuList={menuList} />

        <AppInitializer
          suffixDefaultAccessKey={env.SUFFIX_DEFAULT_ACCESS_KEY}
          session={session}
        />

        {children}
      </div>
    </SidebarProvider>
  )
}
