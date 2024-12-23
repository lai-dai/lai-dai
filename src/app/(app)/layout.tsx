import { SiteFooter } from "~/components/site-footer"
import { SiteHeader } from "~/components/site-header"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div
      className={"border-grid flex flex-1 flex-col"}
      data-wrapper={""}>
      <SiteHeader />

      <main className={"flex flex-1 flex-col"}>{children}</main>

      <SiteFooter />
    </div>
  )
}
