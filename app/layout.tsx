import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import { siteConfig } from '@/config/site'
import { fontMono, fontSans, headerFontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { DeviceDetectProvider } from '@/components/device-detect/server'
import { TailwindIndicator } from '@/components/tailwind-indicator'

import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'Tailwind CSS'],
  authors: [
    {
      name: siteConfig.author,
      url: new URL(siteConfig.url),
    },
  ],
  creator: siteConfig.author,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    username: '/favicon-32x32.png',
  },
  manifest: `${siteConfig.url}/manifest.webmanifest`,
  robots: siteConfig.robots,
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  userScalable: false,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable,
          headerFontSans.variable
        )}
      >
        <div vaul-drawer-wrapper="">
          <NextIntlClientProvider messages={messages}>
            <DeviceDetectProvider>
              <Providers>{children}</Providers>
            </DeviceDetectProvider>
          </NextIntlClientProvider>
        </div>
        <TailwindIndicator />
        <Toaster />
      </body>
    </html>
  )
}
