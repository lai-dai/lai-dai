import "~/styles/mdx.css"

import { type ReactNode } from "react"
import { AppSidebar } from "~/components/app-sidebar"
import { SidebarProvider } from "~/components/ui/sidebar"

export default function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link
        integrity={
          "sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB"
        }
        crossOrigin={"anonymous"}
        href={"https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css"}
        rel={"stylesheet"}
      />

      <SidebarProvider data-wrapper={""}>
        <div
          className={
            "min-h-[calc(100vh-4rem)] flex-1 items-start md:grid md:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] md:gap-6 lg:gap-10"
          }
        >
          <AppSidebar />

          {children}
        </div>
      </SidebarProvider>
    </>
  )
}
