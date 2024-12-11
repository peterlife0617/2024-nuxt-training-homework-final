import type { FetchOptions } from 'ofetch'
import type { GetRoomResponse } from '../models/room'
import type { ApiResponse } from '../types/api-response'
import { apiInstance } from '../api'
import { useApiFactory } from '../helper/factory'

export function useRoomService() {
  const api = useApiFactory(apiInstance)

  return {
    /** 取得房型詳細資料 */
    getRoom: (id: string, options?: FetchOptions) => api.get<ApiResponse<GetRoomResponse>>(`/rooms/${id}`, options),
  }
}
