export type FetcherRequestInit = RequestInit & { params?: Record<string, any> }
export type FetcherOnRequest = (init: FetcherRequestInit) => FetcherRequestInit
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

export function createFetcher({
  onRequest: _onRequest = (init) => init,
  onResponse: _onResponse = (response) => response.json(),
  logOnDev = process?.env?.NODE_ENV === 'development',
  ...props
}: {
  baseUrl?: string
  defaultInit?: RequestInit
  onRequest?: FetcherOnRequest
  onResponse?: FetcherOnResponse
  logOnDev?: boolean
}) {
  const _get: FetcherGet = async (
    _input,
    { params, headers: _headers, body: _body, ..._init } = {},
    onRequest = _onRequest,
    onResponse = _onResponse
  ) => {
    const input = new URL(`${props.baseUrl || ''}${_input}`)

    if (typeof params === 'object') {
      input.search = new URLSearchParams(params).toString()
    }

    const headers = new Headers(
      Object.assign({}, { 'Content-Type': 'application/json' }, _headers)
    )

    const body = _body
      ? headers.get('Content-Type') === 'multipart/form-data'
        ? _body
        : JSON.stringify(_body)
      : undefined

    const init = Object.assign(
      {},
      props.defaultInit,
      { method: 'GET', headers, body },
      _init
    )

    try {
      if (logOnDev)
        // eslint-disable-next-line no-console
        console.log(`🚀 [FETCH - ${init.method}]: ${_input} | Request`)

      const response = await fetch(input, onRequest(init))

      const result = await onResponse(response)

      if (!response.ok) throw result

      if (logOnDev)
        // eslint-disable-next-line no-console
        console.log(
          `👏 [FETCH - ${init.method}]: ${_input} | Response ${response.status}`
        )

      return result
    } catch (error) {
      if (logOnDev)
        // eslint-disable-next-line no-console
        console.error(
          `💥 [FETCH - ${init.method}]: ${_input} | Error: ${(error as Error)?.message || '-'}`
        )
      throw error
    }
  }

  const _delete: FetcherDelete = async (
    input,
    _init,
    onRequest = _onRequest,
    onResponse = _onResponse
  ) => {
    const init = Object.assign({}, { method: 'DELETE' }, _init)

    return _get(input, init, onRequest, onResponse)
  }

  const _post: FetcherPost = async (
    input,
    body,
    _init,
    onRequest = _onRequest,
    onResponse = _onResponse
  ) => {
    const init = Object.assign({}, { method: 'POST', body }, _init)

    return _get(input, init, onRequest, onResponse)
  }

  const _put: FetcherPut = async (
    input,
    body,
    _init,
    onRequest = _onRequest,
    onResponse = _onResponse
  ) => {
    const init = Object.assign({}, { method: 'PUT', body }, _init)

    return _get(input, init, onRequest, onResponse)
  }

  const _patch: FetcherPatch = async (
    input,
    body,
    _init,
    onRequest = _onRequest,
    onResponse = _onResponse
  ) => {
    const init = Object.assign({}, { method: 'PATCH', body }, _init)

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
