import { FetchError, type FetchOptions } from 'ofetch'
import { useApiFactory } from '../helper/use-api-factory'
import { apiInstance } from '../instance'
import { type UserLoginResponse, userLoginResponseSchema } from '../schemas/user-login'

export function useUserLoginApi() {
  const BASE_PATH = '/user/login'

  const api = useApiFactory(apiInstance)

  return {
    login: (data: any, options?: FetchOptions) => api.post(BASE_PATH, data, options, { responseSchema: userLoginResponseSchema }).catch((error) => {
      if (error instanceof FetchError) {
        return error.response?._data as UserLoginResponse
      }
      return Promise.reject(error)
    }),
  }
}
