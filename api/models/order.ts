interface Address {
  zipcode: number
  detail: string
}

interface UserInfo {
  address: Address
  name: string
  phone: string
  email: string
}

export interface RoomId {
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

/** 新增訂單 */
export interface CreateOrderRequest {
  roomId: string
  checkInDate: string
  checkOutDate: string
  peopleNum: number
  userInfo: UserInfo
}

/** 新增訂單 */
export interface CreateOrderResponse {
  userInfo: UserInfo
  _id: string
  roomId: RoomId
  checkInDate: string
  checkOutDate: string
  peopleNum: number
  orderUserId: string
  status: number
  createdAt: string
  updatedAt: string
}
