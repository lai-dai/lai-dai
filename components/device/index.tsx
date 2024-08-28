'use client'

import { ReactNode } from 'react'

import { createContext } from '@/lib/utils/context'

const [DeviceContext, useMobile] = createContext<boolean>()

export let isMobile: boolean

export function DeviceContextProvider(props: {
  children?: ReactNode
  isMobile: boolean
}) {
  isMobile = props.isMobile
  return <DeviceContext value={props.isMobile}>{props.children}</DeviceContext>
}

export function MobileView({ children }: { children?: ReactNode }) {
  const isMobile = useMobile()

  if (isMobile === undefined) {
    throw new Error(
      'Seems you forgot to wrap component within the DeviceProvider'
    )
  }

  if (isMobile) {
    return <>{children}</>
  }
  return null
}

export function DesktopView({ children }: { children?: ReactNode }) {
  const isMobile = useMobile()

  if (isMobile === undefined) {
    throw new Error(
      'Seems you forgot to wrap component within the DeviceProvider'
    )
  }

  if (!isMobile) {
    return <>{children}</>
  }
  return null
}
