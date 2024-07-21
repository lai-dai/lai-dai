import '@/styles/globals.css'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { NotFound } from '@/components/not-found'

export default function Page() {
  return (
    <html lang={siteConfig.defaultLocale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <NotFound />
      </body>
    </html>
  )
}
