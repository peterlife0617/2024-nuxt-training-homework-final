import { FetchError, type FetchOptions } from 'ofetch'
import { useApiFactory } from '../helper/use-api-factory'
import { apiInstance } from '../instance'
import { type UserSignupResponse, userSignupResponseSchema } from '../schemas/user-signup'

export function useUserSignupApi() {
  const BASE_PATH = '/user/signup'

  const api = useApiFactory(apiInstance)

  return {
    signup: (data: any, options?: FetchOptions) => api.post(BASE_PATH, data, options, { responseSchema: userSignupResponseSchema }).catch((error) => {
      if (error instanceof FetchError) {
        return error.response?._data as UserSignupResponse
      }
      return Promise.reject(error)
    }),
  }
}
