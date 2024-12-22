import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../composables/use-api-factory'
import { apiInstance } from '../instance'
import { homeCulinaryResponseSchema } from '../schemas/home-culinary'

export function useHomeCulinaryApi() {
  const BASE_PATH = '/home/culinary'

  const api = useApiFactory(apiInstance)

  return {
    getHomeCulinary: (options?: FetchOptions) => api.get(BASE_PATH, options, { responseSchema: homeCulinaryResponseSchema }),
  }
}
