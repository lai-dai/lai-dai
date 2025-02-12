import React from "react"
import { PhotoProvider } from "~/components/photo-view"

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PhotoProvider>
      <main className={"container mx-auto flex flex-1 flex-col"}>
        {children}
      </main>
    </PhotoProvider>
  )
}
