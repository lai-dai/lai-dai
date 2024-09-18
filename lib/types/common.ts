import React from 'react'

export interface ResFind<TList> {
  status: boolean
  data: {
    list: TList
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
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
