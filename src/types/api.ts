export type ApiResponse<T> = {
  data: T
  meta: T extends Record<string, unknown>
    ? {}
    : {
      pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
      }
    }
}

export type AuthResponse<T> = {
  jwt: string
  user: T
}

export type ErrorResponse = {
  data: null
  error: {
    status: number
    name: string
    message: string
    details: Record<string, unknown>
  }
}
