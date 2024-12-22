import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../composables/use-api-factory'
import { apiInstance } from '../instance'
import { userCheckResponseSchema } from '../schemas/user-check'

export function useUserCheckApi() {
  const BASE_PATH = '/user/check'

  const api = useApiFactory(apiInstance)

  return {
    userCheck: (options?: FetchOptions) => api.get(BASE_PATH, options, { responseSchema: userCheckResponseSchema }),
  }
}
