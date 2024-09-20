import React from 'react'

export interface PaginationAttr {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface ResFind<TList> {
  status: boolean
  data: {
    list: TList
    pagination: PaginationAttr
  }
  message: string
}

export interface ResFindOne<TData> {
  status: boolean
  data: TData
  meta: any
  message: string
}

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface ResFindAdmin<TResult> {
  results: TResult
  pagination: PaginationAttr
}
