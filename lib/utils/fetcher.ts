export interface FetcherRequestInit
  extends Partial<Record<keyof RequestInit, any>> {
  params?: Record<string, any>
}
export type FetcherOnRequest = (
  init: FetcherRequestInit
) => FetcherRequestInit | Promise<FetcherRequestInit>
export type FetcherOnResponse = (response: Response) => Promise<any>
export type FetcherGet = <T>(
  input: string,
  init?: FetcherRequestInit,
  onRequest?: FetcherOnRequest,
  onResponse?: FetcherOnResponse
) => Promise<T>
export type FetcherDelete = FetcherGet
export type FetcherPost = <T>(
  input: string,
  body?: any,
  init?: FetcherRequestInit,
  onRequest?: FetcherOnRequest,
  onResponse?: FetcherOnResponse
) => Promise<T>
export type FetcherPut = FetcherPost
export type FetcherPatch = FetcherPost

export type CreateFetcherOptions = Partial<{
  baseUrl: string
  init: RequestInit
  onRequest: FetcherOnRequest
  onResponse: FetcherOnResponse
  logOnDev: boolean
  paramsStringify?: (params: Record<string, any>) => string | Promise<string>
}>

export function createFetcher(options: CreateFetcherOptions = {}) {
  const {
    baseUrl: dInput,
    init: defaultInit = {},
    onRequest: onDefaultRequest = (init) => init,
    onResponse: onDefaultResponse = async (response) => await response.json(),
    logOnDev = process?.env?.NODE_ENV === 'development',
    paramsStringify = (params) => new URLSearchParams(params).toString(),
  } = options

  const { headers: dHeaders, ...dInit } = defaultInit

  const _get: FetcherGet = async (
    cInput,
    cInit = {},
    onRequest = onDefaultRequest,
    onResponse = onDefaultResponse
  ) => {
    const { headers: cHeaders, body: cBody, ..._cInit } = cInit

    const headers = Object.assign(
      { 'Content-Type': 'application/json' },
      dHeaders,
      cHeaders
    )

    const body = cBody
      ? headers['Content-Type'] === 'application/json'
        ? JSON.stringify(cBody)
        : cBody
      : undefined

    const rInit = Object.assign(
      { method: 'GET' },
      dInit,
      { headers, body },
      _cInit
    )

    try {
      const { params, ...init } = await onRequest(rInit)

      const url = cInput.startsWith('http')
        ? cInput
        : `${dInput || ''}${cInput}`

      const input = new URL(url)

      if (typeof params === 'object') {
        const str = await paramsStringify(params)
        if (typeof str === 'string') input.search = str
      }

      if (logOnDev)
        // eslint-disable-next-line no-console
        console.log(`🚀 FETCH-${init.method} ${input.pathname}`)

      const response = await fetch(input, init)

      const result = await onResponse(response)

      if (!response.ok) {
        if (logOnDev)
          // eslint-disable-next-line no-console
          console.log(
            `💥 FETCH-${init.method} ${input.pathname} ${response.status}`
          )
        throw result
      }

      if (logOnDev)
        // eslint-disable-next-line no-console
        console.log(
          `👏 FETCH-${init.method} ${input.pathname} ${response.status}`
        )

      return result
    } catch (error) {
      throw error
    }
  }

  const _delete: FetcherDelete = async (
    input,
    cInit,
    onRequest = onDefaultRequest,
    onResponse = onDefaultResponse
  ) => {
    const init = Object.assign({ method: 'DELETE' }, cInit)

    return _get(input, init, onRequest, onResponse)
  }

  const _post: FetcherPost = async (
    input,
    body,
    cInit,
    onRequest = onDefaultRequest,
    onResponse = onDefaultResponse
  ) => {
    const init = Object.assign({ method: 'POST', body }, cInit)

    return _get(input, init, onRequest, onResponse)
  }

  const _put: FetcherPut = async (
    input,
    body,
    cInit,
    onRequest = onDefaultRequest,
    onResponse = onDefaultResponse
  ) => {
    const init = Object.assign({ method: 'PUT', body }, cInit)

    return _get(input, init, onRequest, onResponse)
  }

  const _patch: FetcherPatch = async (
    input,
    body,
    cInit,
    onRequest = onDefaultRequest,
    onResponse = onDefaultResponse
  ) => {
    const init = Object.assign({ method: 'PATCH', body }, cInit)

    return _get(input, init, onRequest, onResponse)
  }

  return {
    get: _get,
    post: _post,
    delete: _delete,
    put: _put,
    patch: _patch,
  }
}
