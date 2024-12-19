import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../helper/use-api-factory'
import { apiInstance } from '../instance'
import { homeCulinaryListResponseSchema, homeCulinaryResponseSchema } from '../schemas/home-culinary'

export function useHomeCulinaryApi() {
  const BASE_PATH = '/home/culinary'

  const api = useApiFactory(apiInstance)

  return {
    getHomeCulinaryList: (options?: FetchOptions) => api.get(BASE_PATH, options, { responseSchema: homeCulinaryListResponseSchema }),
    getHomeCulinary: (id: string, options?: FetchOptions) => api.get(`${BASE_PATH}/${id}`, options, { responseSchema: homeCulinaryResponseSchema }),
  }
}
