'use client'

import { useEffect } from 'react'
import Error from 'next/error'
import { siteConfig } from '@/config/site'

export default function Page({ error }: { error: unknown }) {
  useEffect(() => {
    console.error('💥 error', error)
  }, [error])

  return (
    <html lang={siteConfig.defaultLocale}>
      <body>
        <Error statusCode={500} />
      </body>
    </html>
  )
}
