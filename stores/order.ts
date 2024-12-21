interface Order {
  roomId: string
  checkInDate: string
  checkOutDate: string
  peopleNum: number
  roomInfo: {
    name: string
    description: string
    imageUrl: string
    imageUrlList: string[]
    areaInfo: string
    bedInfo: string
    maxPeople: number
    price: number
    status: number
    layoutInfo: { title: string, isProvide: boolean }[]
    facilityInfo: { title: string, isProvide: boolean }[]
    amenityInfo: { title: string, isProvide: boolean }[]
    _id: string
    createdAt: string
    updatedAt: string
  }
}

export const useOrderStore = defineStore('order', () => {
  const order = ref<Order | null>(null)

  const setOrder = (data: Order | null) => {
    order.value = data
  }

  return {
    order,
    setOrder,
  }
})
