'use client'

import * as React from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiAdmin, apiNext, apiTmdb } from '@/lib/api'
import { QUERY_KEYS } from '@/lib/constants/query-key'
import { getErrorMessage } from '@/lib/utils/error-message'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export default function Page() {
  const genreSync = useMutation({
    mutationFn: (data) => apiNext.post<any>(QUERY_KEYS.createManyGenre, data),
  })

  const getGenre = useMutation({
    mutationFn: () => apiTmdb.get<any>(QUERY_KEYS.genreMovie),
  })

  return (
    <div className="p-3">
      <Button
        onClick={() => {
          getGenre.mutate(undefined, {
            onSuccess(data, variables, context) {
              genreSync.mutate(data.genres, {
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
        {genreSync.isPending && <Spinner className="mr-3" />} Sync Genre
      </Button>
    </div>
  )
}
