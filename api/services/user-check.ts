import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../helper/use-api-factory'
import { apiInstance } from '../instance'
import { userCheckResponseSchema } from '../schemas/user-check'

export function useUserCheckApi() {
  const BASE_PATH = '/user/check'

  const api = useApiFactory(apiInstance)

  return {
    userCheck: (data: any, options?: FetchOptions) => api.post(BASE_PATH, data, options, { responseSchema: userCheckResponseSchema }),
  }
}
