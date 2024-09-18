'use client'

import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

export function ProvidersAccount({ children }: { children: ReactNode }) {
  return <SessionProvider basePath="/api/auth">{children}</SessionProvider>
}
