'server only'

import { ReactNode } from 'react'
import { headers } from 'next/headers'
import UAParser from 'ua-parser-js'

import { ClientDeviceDetectProvider } from '.'

export function getDevice() {
  if (typeof process === 'undefined') {
    throw new Error(
      '[Server method] you are importing a server-only module outside of server'
    )
  }

  const { get } = headers()
  const ua = get('user-agent')
  const device = new UAParser(ua || '').getDevice()

  return device
}

export function DeviceDetectProvider({ children }: { children?: ReactNode }) {
  return (
    <ClientDeviceDetectProvider device={getDevice()}>
      {children}
    </ClientDeviceDetectProvider>
  )
}
