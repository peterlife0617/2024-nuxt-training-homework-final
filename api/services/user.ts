import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../helper/use-api-factory'
import { apiInstance } from '../instance'
import { userResponseSchema } from '../schemas/user'

export function useUserApi() {
  const BASE_PATH = '/user'

  const api = useApiFactory(apiInstance)

  return {
    getUser: (options?: FetchOptions) => api.get(BASE_PATH, options, { responseSchema: userResponseSchema }),
    updateUser: (data: any, options?: FetchOptions) => api.put(BASE_PATH, data, options),
  }
}
