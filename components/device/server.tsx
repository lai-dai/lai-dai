'server only'

import { ReactNode } from 'react'
import { headers } from 'next/headers'
import UAParser from 'ua-parser-js'

import { DeviceContextProvider } from '.'

export function isMobile(defaultValue = false) {
  const headersList = headers()
  const userAgent = headersList.get('user-agent')

  if (!userAgent) return defaultValue

  const parser = new UAParser(userAgent)
  const parserDevice = parser.getDevice()

  return parserDevice.type === 'mobile'
}

export function DeviceProvider({ children }: { children?: ReactNode }) {
  return (
    <DeviceContextProvider isMobile={isMobile()}>
      {children}
    </DeviceContextProvider>
  )
}
