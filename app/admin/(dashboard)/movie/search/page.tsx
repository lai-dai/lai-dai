import * as React from 'react'

import { QUERY_KEYS } from '@/lib/constants/query-key'

import { MovieList } from '../view'

export const metadata = {
  title: 'Search Movies',
}

export default function Page() {
  return (
    <div>
      <MovieList isSearch queryKey={QUERY_KEYS.searchMovie} />
    </div>
  )
}
