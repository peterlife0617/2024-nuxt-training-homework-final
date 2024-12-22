import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../composables/use-api-factory'
import { apiInstance } from '../instance'
import { homeCulinaryDetailResponseSchema } from '../schemas/home-culinary-[id]'

export function useHomeCulinaryDetailApi() {
  const BASE_PATH = '/home/culinary'
  const DETAIL_PATH = (id: string) => `${BASE_PATH}/${id}`

  const api = useApiFactory(apiInstance)

  return {
    getHomeCulinaryDetail: (id: string, options?: FetchOptions) => api.get(DETAIL_PATH(id), options, { responseSchema: homeCulinaryDetailResponseSchema }),
  }
}
