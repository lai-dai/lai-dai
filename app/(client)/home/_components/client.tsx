'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useUrlState } from '@/lib/hooks/use-url-state'
import { Button } from '@/components/ui/button'

export function Client() {
  const router = useRouter()

  const [s, setS] = useUrlState({
    age: 20,
    name: '',
  })

  return (
    <>
      <p>Age: {s.age}</p>
      <p>Name: {s.name}</p>

      <Button
        onClick={() => {
          const url = new URL(window.location.href)
          url.searchParams.set('age', new Date().getTime().toString())
          url.searchParams.set('name', 'nam')

          router.push(url.href)
        }}
      >
        age 50 with router
      </Button>
      <Button
        onClick={() => {
          setS({
            age: 25,
          })
        }}
      >
        age 25
      </Button>
      <Button
        onClick={() => {
          setS({
            age: 100,
          })
        }}
      >
        age 100
      </Button>
    </>
  )
}
