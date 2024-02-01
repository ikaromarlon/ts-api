interface RequestConfig {
  url: string
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
  data?: any
  headers?: Record<string, any>
}

type RequestOptions = Omit<RequestConfig, 'url' | 'method'>

export function Requester () {
  const makeRequest = async ({ url, method, data, headers }: RequestConfig) => {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(data)
    })

    const result = {
      status: response.status,
      data: await response.json(),
      headers: Object.fromEntries(response.headers.entries())
    }

    return result
  }

  return {
    post: async (url: string, options: RequestOptions) => await makeRequest({ url, method: 'POST', ...options }),
    get: async (url: string, options: RequestOptions) => await makeRequest({ url, method: 'GET', ...options }),
    put: async (url: string, options: RequestOptions) => await makeRequest({ url, method: 'PUT', ...options }),
    patch: async (url: string, options: RequestOptions) => await makeRequest({ url, method: 'PATCH', ...options })
  }
}
