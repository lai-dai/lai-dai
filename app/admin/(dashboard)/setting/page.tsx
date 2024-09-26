'use client'

import * as React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { apiNext, apiTmdb } from '@/lib/api'
import { QUERY_KEYS } from '@/lib/constants/query-key'
import { PART_OF_SPEECH } from '@/lib/data/part-of-speech'
import { getErrorMessage } from '@/lib/utils/error-message'
import { slugify } from '@/lib/utils/slugify'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export default function Page() {
  const { data: session } = useSession()

  const genreSync = useMutation({
    mutationFn: (data: any) =>
      apiNext.post<any>(QUERY_KEYS.createManyGenre, data),
  })

  const partOfSpeechSync = useMutation({
    mutationFn: (data: any) =>
      apiNext.post<any>(QUERY_KEYS.createManyPartOfSpeech, data),
  })

  const getGenre = useMutation({
    mutationFn: () =>
      apiTmdb.get<any>(QUERY_KEYS.genreMovie, {
        params: {
          language: 'vi-VN',
        },
      }),
  })

  return (
    <div className="space-x-3 p-3">
      <Button
        onClick={() => {
          getGenre.mutate(undefined, {
            onSuccess(data, variables, context) {
              const result = data.genres.map((item: any) => ({
                name: item.name,
                slug: slugify(item.name),
                create_by_id: session?.user.id,
                tmdb_id: item.id,
              }))

              genreSync.mutate(result, {
                onSuccess(data, variables, context) {
                  toast.success('Sync Successfully')
                },
                onError(error, variables, context) {
                  toast.error(getErrorMessage(error))
                },
              })
            },
            onError(error, variables, context) {
              toast.error(getErrorMessage(error))
            },
          })
        }}
        disabled={genreSync.isPending}
      >
        {genreSync.isPending && <Spinner size={'xs'} className="mr-3" />} Sync
        Genre
      </Button>

      <Button
        onClick={() => {
          const result = PART_OF_SPEECH.map((item) => ({
            ...item,
            slug: slugify(item.name),
            create_by_id: session?.user.id,
          }))

          partOfSpeechSync.mutate(result, {
            onSuccess(data, variables, context) {
              toast.success('Sync Successfully')
            },
            onError(error, variables, context) {
              toast.error(getErrorMessage(error))
            },
          })
        }}
      >
        {partOfSpeechSync.isPending && <Spinner size={'xs'} className="mr-3" />}
        Sync Part Of Speech
      </Button>
    </div>
  )
}
