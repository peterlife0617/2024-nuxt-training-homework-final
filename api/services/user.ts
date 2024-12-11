import type { FetchOptions } from 'ofetch'
import type { UserLoginRequest } from '../models/user'
import type { ApiResponseWithToken } from '../types/api-response'
import { apiInstance } from '../api'
import { useApiFactory } from '../helper/factory'

export function useUserService() {
  const api = useApiFactory(apiInstance)

  return {
    /** 登入 */
    login: (data: UserLoginRequest, options?: FetchOptions) => api.post<ApiResponseWithToken>('/user/login', {
      ...options,
      body: data,
    }),
  }
}
