import { PhotoProvider } from "~/components/photo-view"
import { SiteFooter } from "~/components/site-footer"
import { SiteHeader } from "~/components/site-header"
import { SelectionTextPopover } from "~/features/selection-text/selection-text-popover"

interface AppLayoutProps {
  children: React.ReactNode
}

export const revalidate = 3600  // 1h

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <div
      className={"border-grid flex flex-1 flex-col"}
      data-wrapper={""}
    >
      <SiteHeader />

      <PhotoProvider >
        <main className={"flex flex-1 flex-col"}>{children}</main>
      </PhotoProvider>

      <SiteFooter />

      <SelectionTextPopover />
    </div>
  )
}
