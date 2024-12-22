import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../helper/use-api-factory'
import { apiInstance } from '../instance'
import { roomsResponseSchema } from '../schemas/rooms'

export function useRoomsApi() {
  const BASE_PATH = '/rooms'

  const api = useApiFactory(apiInstance)

  return {
    getRooms: (options?: FetchOptions) => api.get(BASE_PATH, options, { responseSchema: roomsResponseSchema }),
  }
}
