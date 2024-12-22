import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../composables/use-api-factory'
import { apiInstance } from '../instance'
import { userForgetResponseSchema } from '../schemas/user-forget'

export function useUserForgetApi() {
  const BASE_PATH = '/user/forget'

  const api = useApiFactory(apiInstance)

  return {
    userForget: (data: any, options?: FetchOptions) => api.post(BASE_PATH, data, options, { responseSchema: userForgetResponseSchema }),
  }
}
