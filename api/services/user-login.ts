import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../helper/use-api-factory'
import { apiInstance } from '../instance'
import { userLoginResponseSchema } from '../schemas/user-login'

export function useUserLoginApi() {
  const BASE_PATH = '/user/login'

  const api = useApiFactory(apiInstance)

  return {
    login: (data: any, options?: FetchOptions) => api.post(BASE_PATH, data, options, { responseSchema: userLoginResponseSchema }),
  }
}
