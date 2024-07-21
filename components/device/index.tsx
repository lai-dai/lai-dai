'use client'

import { createContext, ReactNode, useContext } from 'react'

export const DeviceContext = createContext<boolean | undefined>(undefined)

export const useMobile = () => useContext(DeviceContext)

export let isMobile: boolean

export function DeviceContextProvider(props: {
  children?: ReactNode
  isMobile: boolean
}) {
  isMobile = props.isMobile
  return (
    <DeviceContext.Provider value={props.isMobile}>
      {props.children}
    </DeviceContext.Provider>
  )
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
