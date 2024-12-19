import type { FetchOptions } from 'ofetch'

export function createApiInstance(options: FetchOptions = {}) {
  return $fetch.create(options)
}

export const apiInstance = createApiInstance()
