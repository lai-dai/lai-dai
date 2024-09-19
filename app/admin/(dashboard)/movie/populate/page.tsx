import * as React from 'react'

import { QUERY_KEYS } from '@/lib/constants/query-key'

import { MovieList } from '../view'

export const metadata = {
  title: 'Populate Movies',
}

export default function Page() {
  return (
    <div>
      <MovieList queryKey={QUERY_KEYS.moviePopular} />
    </div>
  )
}
