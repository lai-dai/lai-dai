'use client'

import React from 'react'

import { URL_STATE_RESET, useUrlState } from '@/lib/hooks/use-url-state'
import { Button } from '@/components/ui/button'
import { MarketingPageContainer } from '@/components/page-container'

export default function Page() {
  const [s, setUrl] = useUrlState({
    text: 'text',
    num: 1,
    textArr: ['text-1', 'text-2', 'text-3'],
    numArr: [1, 2, 3],
    objArr: [
      {
        text: 'text',
      },
    ],
  })

  return (
    <MarketingPageContainer className="space-y-6">
      CONTACT
      <div className="space-x-3">
        <Button
          onClick={() => {
            setUrl(URL_STATE_RESET)
          }}
        >
          reset
        </Button>
        <Button
          onClick={() => {
            setUrl({ text: 'text' + new Date().getTime() })
          }}
        >
          text
        </Button>
        <Button
          onClick={() => {
            setUrl({ text: '0' })
          }}
        >
          text 0
        </Button>

        <Button
          onClick={() => {
            setUrl({ num: new Date().getTime() })
          }}
        >
          num
        </Button>

        <Button
          onClick={() => {
            setUrl({ textArr: [...s.textArr, 'text' + new Date().getTime()] })
          }}
        >
          text arr
        </Button>
        <Button
          onClick={() => {
            setUrl({ numArr: [...s.numArr, new Date().getTime()] })
          }}
        >
          num arr
        </Button>

        <Button
          onClick={() => {
            setUrl({
              objArr: [
                ...s.objArr,
                {
                  text: 'text' + new Date().getTime(),
                },
              ],
            })
          }}
        >
          obj
        </Button>
      </div>
      <div className="whitespace-pre">{JSON.stringify(s, null, 4)}</div>
    </MarketingPageContainer>
  )
}
