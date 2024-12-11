/** 取得房型列表 - response */
export type GetRoomsResponse = {
  name: string
  description: string
  imageUrl: string
  imageUrlList: string[]
  areaInfo: string
  bedInfo: string
  maxPeople: number
  price: number
  status: number
  layoutInfo: any[]
  facilityInfo: any[]
  amenityInfo: any[]
  _id: string
  createdAt: string
  updatedAt: string
}[]

/** 取得房型詳細資料 - response */
export interface GetRoomResponse {
  name: string
  description: string
  imageUrl: string
  imageUrlList: string[]
  areaInfo: string
  bedInfo: string
  maxPeople: number
  price: number
  status: number
  layoutInfo: any[]
  facilityInfo: any[]
  amenityInfo: any[]
  _id: string
  createdAt: string
  updatedAt: string
}
