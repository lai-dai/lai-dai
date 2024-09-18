'use client'

import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

export const metadata = {
  title: 'Admin',
}

export function ProvidersAdmin({ children }: { children: ReactNode }) {
  return (
    <SessionProvider basePath="/api/auth/admin">{children}</SessionProvider>
  )
}
