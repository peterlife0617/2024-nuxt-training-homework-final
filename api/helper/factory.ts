import type { FetchOptions } from 'ofetch'
import type { ZodType, ZodTypeAny } from 'zod'

interface ValidateOptions<TResponse = any> {
  responseSchema?: ZodType<TResponse>
  querySchema?: ZodTypeAny
  bodySchema?: ZodTypeAny
  paramsSchema?: ZodTypeAny
}

export function useApiFactory(fetch: typeof $fetch) {
  const {
    public: { apiUrl },
  } = useRuntimeConfig()

  const token = useCookie('accountToken')

  const getFactoryOptions = (options?: ValidateOptions) => {
    return {
      baseURL: apiUrl,
      headers: {
        Authorization: `${token.value}`,
      },
      onResponse: ({ response, request }) => {
        if (options?.responseSchema) {
          const result = options.responseSchema.safeParse(response._data)
          if (result.success) {
            return response._data
          }
          else {
            console.error(result.error.errors)
            const url = typeof request === 'string' ? request : request.url
            throw new Error(`Error validating response from ${url}`)
          }
        }
        return response._data
      },
    } satisfies FetchOptions
  }

  return {
    get: <TData>(url: string, options?: FetchOptions, validateOptions?: ValidateOptions<TData>) => {
      return fetch<TData>(url, {
        ...options,
        ...getFactoryOptions(validateOptions),
        method: 'GET',

      })
    },

    post: <TData>(
      url: string,
      options?: FetchOptions,
      validateOptions?: ValidateOptions<TData>,
    ) =>
      fetch<TData>(url, {
        ...options,
        ...getFactoryOptions(validateOptions),
        method: 'POST',
      }),
  }
}
