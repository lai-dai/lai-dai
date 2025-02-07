export interface ActionResponse<T extends Record<string, unknown>> {
  success: boolean
  message: string
  errors?: {
    [K in keyof T]?: string[]
  }
}
