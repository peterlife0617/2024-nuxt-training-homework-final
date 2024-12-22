import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../composables/use-api-factory'
import { apiInstance } from '../instance'
import { homeNewsResponseSchema } from '../schemas/home-news'

export function useHomeNewsApi() {
  const BASE_PATH = '/home/news'

  const api = useApiFactory(apiInstance)

  return {
    getHomeNews: (options?: FetchOptions) => api.get(BASE_PATH, options, { responseSchema: homeNewsResponseSchema }),
  }
}
