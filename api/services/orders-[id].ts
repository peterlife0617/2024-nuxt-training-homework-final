import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../composables/use-api-factory'
import { apiInstance } from '../instance'
import { orderDetailDeleteResponseSchema, orderDetailResponseSchema } from '../schemas/orders-[id]'

export function useOrdersDetailApi() {
  const BASE_PATH = '/orders'
  const DETAIL_PATH = (id: string) => `${BASE_PATH}/${id}`

  const api = useApiFactory(apiInstance)

  return {
    getOrderDetail: (id: string, options?: FetchOptions) => api.get(DETAIL_PATH(id), options, { responseSchema: orderDetailResponseSchema }),
    deleteOrderDetail: (id: string, options?: FetchOptions) => api.delete(DETAIL_PATH(id), options, { responseSchema: orderDetailDeleteResponseSchema }),
  }
}
