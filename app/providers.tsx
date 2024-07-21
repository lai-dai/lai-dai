import React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { TooltipProvider } from '@/components/ui/tooltip'
import { DeviceProvider } from '@/components/device/server'
import { TailwindIndicator } from '@/components/tailwind-indicator'

export async function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider
        // disableHoverableContent
        delayDuration={200}
        skipDelayDuration={100}
      >
        <DeviceProvider>{children}</DeviceProvider>
      </TooltipProvider>
      <TailwindIndicator />
    </NextThemesProvider>
  )
}
