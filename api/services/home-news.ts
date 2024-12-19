import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../helper/use-api-factory'
import { apiInstance } from '../instance'
import { homeNewsListResponseSchema, homeNewsResponseSchema } from '../schemas/home-news'

export function useHomeNewsApi() {
  const BASE_PATH = '/home/news'

  const api = useApiFactory(apiInstance)

  return {
    getHomeNewsList: (options?: FetchOptions) => api.get(BASE_PATH, options, { responseSchema: homeNewsListResponseSchema }),
    getHomeNews: (id: string, options?: FetchOptions) => api.get(`${BASE_PATH}/${id}`, options, { responseSchema: homeNewsResponseSchema }),
  }
}
