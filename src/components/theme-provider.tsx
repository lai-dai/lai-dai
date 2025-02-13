"use client"

import * as React from "react"
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes"

/**
 * Your app's theme provider component.
 * 'use client' is essential for next-themes to work with app-dir.
 */
export function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemesProvider {...props} />
}
