import React from "react"
import { PhotoProvider } from "~/components/photo-view"

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className={"mx-auto min-h-svh max-w-7xl border-dashed xl:border-x"}>
      <PhotoProvider>{children}</PhotoProvider>
    </main>
  )
}
