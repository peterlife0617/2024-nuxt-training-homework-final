import type { FetchOptions } from 'ofetch'
import type { ValidateOptions } from '../types/validate-options'
import { CookieEnum } from '~/enums/cookie'
import { apiErrorHandler } from './api-error-handler'
import { createOptions } from './create-options'

export function useApiFactory(fetch: typeof $fetch) {
  const {
    public: { apiUrl },
  } = useRuntimeConfig()

  const token = useCookie(CookieEnum.Auth)

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
      data: any,
      options?: FetchOptions,
      validateOptions?: ValidateOptions<TResponse>,
    ) =>
      fetch<TResponse>(url, {
        ...options,
        ...createOptions({ ...validateOptions, apiUrl, token: token.value }),
        method: 'POST',
        body: data,
      }).catch(apiErrorHandler),

    put: <TResponse>(
      url: string,
      data: any,
      options?: FetchOptions,
      validateOptions?: ValidateOptions<TResponse>,
    ) =>
      fetch<TResponse>(url, {
        ...options,
        ...createOptions({ ...validateOptions, apiUrl, token: token.value }),
        method: 'PUT',
        body: data,
      }).catch(apiErrorHandler),

    delete: <TResponse>(url: string, options?: FetchOptions, validateOptions?: ValidateOptions<TResponse>) => {
      return fetch<TResponse>(url, {
        ...options,
        ...createOptions({ ...validateOptions, apiUrl, token: token.value }),
        method: 'DELETE',
      }).catch(apiErrorHandler)
    },
  }
}
