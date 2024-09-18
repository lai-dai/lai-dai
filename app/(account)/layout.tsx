import React, { ReactNode } from 'react'
import { Metadata } from 'next'

import { ProvidersAccount } from './providers'

export const metadata: Metadata = {
  title: 'Account',
}

export default function LayoutAccount({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ProvidersAccount>
      <main className="bg-accent">{children}</main>
    </ProvidersAccount>
  )
}
