'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { format, parse } from 'date-fns'
import { toast } from 'sonner'

import { apiAdmin, apiTmdb } from '@/lib/api'
import { QUERY_KEYS } from '@/lib/constants/query-key'
import { getErrorMessage } from '@/lib/utils/error-message'
import { slugify } from '@/lib/utils/slugify'
import { tmdbImageUrlBuilder } from '@/lib/utils/tmdb-image-url-builder'
import { Button } from '@/components/ui/button'
import { Center } from '@/components/ui/center'
import { Image } from '@/components/ui/image'
import { SearchInput } from '@/components/ui/search-input'
import { Spinner } from '@/components/ui/spinner'
import { Message } from '@/components/message'

type MoviePopularAttr = {
  page: number
  results: {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: false
    vote_average: number
    vote_count: number
  }[]
  total_pages: number
  total_results: number
}

type MovieAttr = {
  adult: boolean
  backdrop_path: string
  budget: number
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  revenue: number
  runtime: number
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export function MovieList({
  queryKey,
  isSearch,
}: {
  queryKey: string
  isSearch?: boolean
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('query')

  const searchData = useInfiniteQuery({
    queryKey: [queryKey, query],
    queryFn: (ctx) =>
      apiTmdb.get<MoviePopularAttr>(queryKey, {
        params: {
          page: ctx.pageParam,
          language: 'vi-VN',
          ...(isSearch ? { query } : {}),
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPage.page === lastPage.total_pages) return undefined
      return allPages.length + 1
    },
  })

  const createMovie = useMutation({
    mutationFn: (data: any) => apiAdmin.post<any>(QUERY_KEYS.movieAdmin, data),
  })

  const searchMovie = useMutation({
    mutationFn: (_q: string) =>
      apiAdmin.get<any>(QUERY_KEYS.movieAdmin, {
        params: {
          _q,
        },
      }),
  })

  const findOneMovie = useMutation({
    mutationFn: (id: number) =>
      apiTmdb.get<MovieAttr>(QUERY_KEYS.movieById + '/' + id, {
        params: {
          language: 'vi-VN',
        },
      }),
  })

  if (searchData.status === 'pending') {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  } else if (searchData.status === 'error') {
    return (
      <Center>
        <Message.Error>{getErrorMessage(searchData.error)}</Message.Error>
      </Center>
    )
  }

  const dataList = searchData.data.pages.flatMap((page) => page.results)

  return (
    <div className="container max-w-6xl space-y-6 p-3">
      <div className="flex justify-center">
        <SearchInput
          defaultValue={query || ''}
          onSearchChange={(value) => {
            if (value) router.push('/admin/movie/search?query=' + value)
            else router.push('/admin/movie')
          }}
          placeholder="Search"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {dataList.map((item) => (
          <div
            key={item.id}
            title={item.title}
            onClick={() => {
              searchMovie.mutate(slugify(item.original_title), {
                onSuccess(data, variables, context) {
                  if (data.results.length) {
                    router.push('/admin/subtitle?movie=' + data.results[0].id)
                  } else {
                    findOneMovie.mutate(item.id, {
                      onSuccess(data, variables, context) {
                        createMovie.mutate(
                          {
                            title: data.title,
                            overview: data.overview,
                            release_date: parse(
                              data.release_date,
                              'yyyy-MM-dd',
                              new Date()
                            ),
                            original_title: data.original_title,
                            poster_path: data.poster_path,
                            original_language: data.original_language,
                            vote_average: data.vote_average,
                            vote_count: data.vote_count,
                            adult: data.adult,
                            backdrop_path: data.backdrop_path,
                            imdb_id: data.imdb_id,
                            runtime: data.runtime,
                            slug: slugify(data.title),
                            original_slug: slugify(data.original_title),
                            seo: null,
                          },
                          {
                            onSuccess(data, variables, context) {
                              router.push('/admin/subtitle?movie=' + data.id)
                            },
                            onError(error, variables, context) {
                              toast.error(getErrorMessage(error))
                            },
                          }
                        )
                      },
                      onError(error, variables, context) {
                        toast.error(getErrorMessage(error))
                      },
                    })
                  }
                },
                onError(error, variables, context) {
                  toast.error(getErrorMessage(error))
                },
              })
            }}
            className="flex cursor-pointer flex-col overflow-hidden rounded-xl border"
          >
            <div className="h-80 w-full overflow-hidden">
              <Image
                src={tmdbImageUrlBuilder(item.poster_path)}
                alt={item.original_title}
                className="size-full object-cover"
              />
            </div>
            <div className="flex grow flex-col justify-between space-y-2 p-3">
              <h4 className="line-clamp-2 h-12 font-bold">{item.title}</h4>
              <p className="text-sm text-muted-foreground">
                {format(
                  parse(item.release_date, 'yyyy-MM-dd', new Date()),
                  'dd LLL, yyyy'
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {searchData.hasNextPage && (
        <div className="text-center">
          <Button onClick={() => searchData.fetchNextPage()}>
            {searchData.isFetchingNextPage && <Spinner className="mr-3" />}
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}
