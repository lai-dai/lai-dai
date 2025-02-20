import React from "react"

export function Client({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isClient, setIsClient] = React.useState(false)

  React.useLayoutEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return children
}
