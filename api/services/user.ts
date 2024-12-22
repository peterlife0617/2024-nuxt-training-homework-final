import { FetchError, type FetchOptions } from 'ofetch'
import { useApiFactory } from '../composables/use-api-factory'
import { apiInstance } from '../instance'
import { type UpdateUserResponse, updateUserResponseSchema, userResponseSchema } from '../schemas/user'

export function useUserApi() {
  const BASE_PATH = '/user'

  const api = useApiFactory(apiInstance)

  return {
    getUser: (options?: FetchOptions) => api.get(BASE_PATH, options, { responseSchema: userResponseSchema }),
    updateUser: (data: any, options?: FetchOptions) => api.put(BASE_PATH, data, options, { responseSchema: updateUserResponseSchema }).catch((error) => {
      if (error instanceof FetchError) {
        return error.response?._data as UpdateUserResponse
      }
      return Promise.reject(error)
    }),
  }
}
