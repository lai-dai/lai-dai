import { useEffect, useLayoutEffect } from 'react'

// this code is taken from nextui ❤️

export const useSafeLayoutEffect = Boolean(globalThis?.document)
  ? useLayoutEffect
  : useEffect
