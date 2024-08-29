'use client'

import { ReactNode } from 'react'
import { IDevice } from 'ua-parser-js'

import { createContext } from '@/lib/utils/create-context'

export const [_Provider, useDevice] = createContext<IDevice>()

export let isMobile: boolean
export let isTablet: boolean
export let isDesktop: boolean
export let isWearable: boolean

export function ClientDeviceDetectProvider({
  children,
  device,
}: {
  children?: ReactNode
  device: IDevice
}) {
  isMobile = device.type === 'mobile'
  isTablet = device.type === 'tablet'
  isDesktop = device.type === undefined
  return <_Provider value={device}>{children}</_Provider>
}

export function MobileView({ children }: { children?: ReactNode }) {
  if (isMobile) {
    return <>{children}</>
  }
  return null
}

export function TabletView({ children }: { children?: ReactNode }) {
  if (isTablet) {
    return <>{children}</>
  }
  return null
}

export function DesktopView({ children }: { children?: ReactNode }) {
  if (isDesktop) {
    return <>{children}</>
  }
  return null
}

export function WearableView({ children }: { children?: ReactNode }) {
  if (isWearable) {
    return <>{children}</>
  }
  return null
}
