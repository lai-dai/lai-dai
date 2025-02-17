"use client"

import { Session } from "next-auth"
import React from "react"

import { useLazyRef } from "~/hooks/use-lazy-ref"
import { useSessionStore } from "~/hooks/use-session"
import { setSuffixDefaultAccessKey } from "~/lib/api"

interface AppInitializerProps {
  children: React.ReactNode
  suffixDefaultAccessKey: string
  session?: Session | null
}

export function AppInitializer({
  children,
  suffixDefaultAccessKey,
  session,
}: AppInitializerProps) {
  useLazyRef(() => {
    setSuffixDefaultAccessKey(suffixDefaultAccessKey)
  })

  useLazyRef(() => {
    if (session) {
      useSessionStore.setState({ session })
    }
  })

  return children
}
