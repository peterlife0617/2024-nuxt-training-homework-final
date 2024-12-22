import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../helper/use-api-factory'
import { apiInstance } from '../instance'
import { homeNewsDetailResponseSchema } from '../schemas/home-news-[id]'

export function useHomeNewsDetailApi() {
  const BASE_PATH = '/home/news'
  const DETAIL_PATH = (id: string) => `${BASE_PATH}/${id}`

  const api = useApiFactory(apiInstance)

  return {
    getHomeNewsDetail: (id: string, options?: FetchOptions) => api.get(DETAIL_PATH(id), options, { responseSchema: homeNewsDetailResponseSchema }),
  }
}
