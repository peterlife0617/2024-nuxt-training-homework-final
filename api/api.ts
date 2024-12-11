import type { FetchOptions } from 'ofetch'
import { apiInterceptor } from './helper/interceptor'

export function createApiInstance(options: FetchOptions) {
  return $fetch.create(options)
}

export const apiInstance = createApiInstance(
  apiInterceptor,
)
