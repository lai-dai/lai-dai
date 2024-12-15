interface RequestConfig extends RequestInit {
  url: string
  params?: Record<string, string | number>
}

interface FetchResponse<T> extends Response {
  config: RequestConfig
  data: T
}

interface CustomFetchConfig extends RequestInit {
  baseUrl?: string
  baseParams?: Record<string, string | number>
  interceptors: {
    request: ((
      config: RequestConfig,
    ) => RequestConfig | Promise<RequestConfig>)[]
    response: (<T>(
      response: FetchResponse<T>,
    ) => FetchResponse<T> | Promise<FetchResponse<T>>)[]
  }
}

class CustomFetch {
  private config: CustomFetchConfig

  constructor(config: Partial<Omit<CustomFetchConfig, "interceptors">> = {}) {
    this.config = {
      ...config,
      interceptors: {
        request: [],
        response: [],
      },

      // ... other default config options
    }
  }

  private createUrl(
    url: string,
    params?: Record<string, string | number>,
  ): string {
    const { baseUrl, baseParams } = this.config

    const fullUrl = new URL(url, baseUrl)

    const fullParams = {
      ...baseParams,
      ...params,
    }

    Object.keys(fullParams).forEach(key =>
      fullUrl.searchParams.append(key, String(fullParams[key])),
    )

    return fullUrl.toString()
  }

  public async fetch<TData>(config: RequestConfig) {
    const fullUrl = this.createUrl(config.url, config.params)

    const { baseUrl: _, baseParams: __, interceptors, ...baseConfig } = this.config

    let requestConfig: RequestConfig = {
      ...baseConfig,
      ...config,
      headers: {
        ...baseConfig.headers,
        ...config.headers,
      },
      method: config?.method ?? "GET",
    }

    // Apply request interceptors
    for (const interceptor of interceptors.request) {
      requestConfig = await interceptor(requestConfig)
    }

    try {
      const { url: ___, params: ____, ...requestInit } = requestConfig

      let response = (await fetch(fullUrl, requestInit)) as FetchResponse<TData>

      response.config = requestConfig
      response.data = await response.json()

      // Apply response interceptors
      for (const interceptor of interceptors.response) {
        response = await interceptor(response)
      }

      if (!response.ok) {
        throw response.data
      }

      return response
    } catch (error) {
      throw error as Error
    }
  }

  // Add request interceptor
  public addRequestInterceptor(
    interceptor: (
      config: RequestConfig,
    ) => RequestConfig | Promise<RequestConfig>,
  ) {
    this.config.interceptors.request.push(interceptor)
  }

  // Add response interceptor
  public addResponseInterceptor(
    interceptor: <T>(
      response: FetchResponse<T>,
    ) => FetchResponse<T> | Promise<FetchResponse<T>>,
  ) {
    this.config.interceptors.response.push(interceptor)
  }

  public async get<T>(
    url: string,
    config: Omit<RequestConfig, "url"> = {},
  ): Promise<T> {
    const response = await this.fetch<T>({
      ...config,
      url,
    })

    return response.data
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config: Omit<RequestConfig, "url" | "body"> = {},
  ): Promise<T> {
    const response = await this.fetch<T>({
      ...config,
      url,
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    })

    return response.data
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config: Omit<RequestConfig, "url" | "body"> = {},
  ): Promise<T> {
    const response = await this.fetch<T>({
      ...config,
      url,
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    })

    return response.data
  }

  public async delete<T>(
    url: string,
    config: Omit<RequestConfig, "url"> = {},
  ): Promise<T> {
    const response = await this.fetch<T>({
      ...config,
      url,
      method: "DELETE",
    })

    return response.data
  }

  // ... other methods for adding interceptors, configuring defaults, etc.
}

export { CustomFetch }
