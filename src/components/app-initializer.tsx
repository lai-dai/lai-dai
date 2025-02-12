"use client"

import React from "react"

import { useLazyRef } from "~/hooks/use-lazy-ref"
import { setSuffixDefaultAccessKey } from "~/lib/api"

interface AppInitializerProps {
  children: React.ReactNode
  suffixDefaultAccessKey: string
}

export function AppInitializer({
  children,
  suffixDefaultAccessKey,
}: AppInitializerProps) {
  useLazyRef(() => {
    setSuffixDefaultAccessKey(suffixDefaultAccessKey)
  })

  return children
}
