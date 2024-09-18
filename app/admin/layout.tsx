import * as React from 'react'

import { ProvidersAdmin } from './providers'

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ProvidersAdmin>{children}</ProvidersAdmin>
}
