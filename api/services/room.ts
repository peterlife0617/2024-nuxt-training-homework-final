import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../helper/use-api-factory'
import { apiInstance } from '../instance'
import { roomListResponseSchema, roomResponseSchema } from '../schemas/room'

export function useRoomApi() {
  const BASE_PATH = '/rooms'

  const api = useApiFactory(apiInstance)

  return {
    getRoomList: (options?: FetchOptions) => api.get(BASE_PATH, options, { responseSchema: roomListResponseSchema }),
    getRoom: (id: string, options?: FetchOptions) => api.get(`${BASE_PATH}/${id}`, options, { responseSchema: roomResponseSchema }),
  }
}
