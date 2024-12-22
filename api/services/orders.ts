import { FetchError, type FetchOptions } from 'ofetch'
import { useApiFactory } from '../composables/use-api-factory'
import { apiInstance } from '../instance'
import { type OrdersCreateResponse, ordersCreateResponseSchema, ordersResponseSchema } from '../schemas/orders'

export function useOrdersApi() {
  const BASE_PATH = '/orders'

  const api = useApiFactory(apiInstance)

  return {
    getOrders: (options?: FetchOptions) => api.get(BASE_PATH, options, { responseSchema: ordersResponseSchema }),
    createOrder: (data: any, options?: FetchOptions) => api.post(BASE_PATH, data, options, { responseSchema: ordersCreateResponseSchema }).catch((error) => {
      if (error instanceof FetchError) {
        return error.response?._data as OrdersCreateResponse
      }
      return Promise.reject(error)
    }),
  }
}
