import type { FetchOptions } from 'ofetch'
import type { ValidateOptions } from '../types/validate-options'
import { apiErrorHandler } from './api-error-handler'
import { createOptions } from './create-options'

export function useApiFactory(fetch: typeof $fetch) {
  const {
    public: { apiUrl },
  } = useRuntimeConfig()

  const token = useCookie('accountToken')

  return {
    get: <TResponse>(url: string, options?: FetchOptions, validateOptions?: ValidateOptions<TResponse>) => {
      return fetch<TResponse>(url, {
        ...options,
        ...createOptions({ ...validateOptions, apiUrl, token: token.value }),
        method: 'GET',
      }).catch(apiErrorHandler)
    },

    post: <TResponse>(
      url: string,
      options?: FetchOptions,
      validateOptions?: ValidateOptions<TResponse>,
    ) =>
      fetch<TResponse>(url, {
        ...options,
        ...createOptions({ ...validateOptions, apiUrl, token: token.value }),
        method: 'POST',
      }).catch(apiErrorHandler),
  }
}
