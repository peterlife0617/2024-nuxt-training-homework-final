import type { FetchOptions } from 'ofetch'
import type { ValidateOptions } from '../types/validate-options'
import { SchemaError } from '~/utils/error'

interface CreateOptionsParams extends ValidateOptions {
  apiUrl: string
  token?: string | null
}

export function createOptions(params?: CreateOptionsParams) {
  const { apiUrl, token, responseSchema } = params ?? {}

  return {
    baseURL: apiUrl,
    headers: {
      Authorization: `${token}`,
    },
    onResponse: ({ response, request }) => {
      if (responseSchema) {
        const result = responseSchema.safeParse(response._data)
        if (result.success) {
          return response._data
        }
        const url = typeof request === 'string' ? request : request.url
        throw new SchemaError(`Error validating response from ${url}`, result.error.errors)
      }
      return response._data
    },
  } satisfies FetchOptions
}
