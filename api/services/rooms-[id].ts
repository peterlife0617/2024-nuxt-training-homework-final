import type { FetchOptions } from 'ofetch'
import { useApiFactory } from '../composables/use-api-factory'
import { apiInstance } from '../instance'
import { roomsDetailResponseSchema } from '../schemas/rooms-[id]'

export function useRoomsDetailApi() {
  const BASE_PATH = '/rooms'
  const DETAIL_PATH = (id: string) => `${BASE_PATH}/${id}`

  const api = useApiFactory(apiInstance)

  return {
    getRoom: (id: string, options?: FetchOptions) => api.get(DETAIL_PATH(id), options, { responseSchema: roomsDetailResponseSchema }),
  }
}
