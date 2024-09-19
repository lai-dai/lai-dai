import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { authAdmin } from '@/lib/auth-admin'

import { SiteAside } from './_layout/site-aside'
import { SiteHeader } from './_layout/site-header'

export const metadata = {
  title: 'Admin',
}

export default async function LayoutAdmin({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await authAdmin()

  if (!session) redirect('/admin/login')

  return (
    <div className="grid min-h-screen md:grid-cols-[256px_1fr]">
      <SiteAside />

      <main className="flex min-h-screen flex-col">
        <SiteHeader />
        {children}
      </main>
    </div>
  )
}
