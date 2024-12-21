import { z } from 'zod'
import { apiResponseSchema } from '../helper/api-response-schema'

export const ordersSchema = z.array(z.object({
  userInfo: z.object({
    address: z.object({
      zipcode: z.number(),
      detail: z.string(),
      city: z.string().optional(),
      county: z.string().optional(),
    }),
    name: z.string(),
    phone: z.string(),
    email: z.string(),
  }),
  _id: z.string(),
  roomId: z.object({
    name: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    imageUrlList: z.array(z.string()),
    areaInfo: z.string(),
    bedInfo: z.string(),
    maxPeople: z.number(),
    price: z.number(),
    status: z.number(),
    layoutInfo: z.array(z.object({
      title: z.string(),
      isProvide: z.boolean(),
    })),
    facilityInfo: z.array(z.object({
      title: z.string(),
      isProvide: z.boolean(),
    })),
    amenityInfo: z.array(z.object({
      title: z.string(),
      isProvide: z.boolean(),
    })),
    _id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  peopleNum: z.number(),
  orderUserId: z.string(),
  status: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
}))

export const orderDetailSchema = z.object({
  userInfo: z.object({
    address: z.object({
      zipcode: z.number(),
      detail: z.string(),
      city: z.string().optional(),
      county: z.string().optional(),
    }),
    name: z.string(),
    phone: z.string(),
    email: z.string(),
  }),
  _id: z.string(),
  roomId: z.object({
    name: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    imageUrlList: z.array(z.string()),
    areaInfo: z.string(),
    bedInfo: z.string(),
    maxPeople: z.number(),
    price: z.number(),
    status: z.number(),
    layoutInfo: z.array(z.object({
      title: z.string(),
      isProvide: z.boolean(),
    })),
    facilityInfo: z.array(z.object({
      title: z.string(),
      isProvide: z.boolean(),
    })),
    amenityInfo: z.array(z.object({
      title: z.string(),
      isProvide: z.boolean(),
    })),
    _id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  peopleNum: z.number(),
  orderUserId: z.string(),
  status: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const ordersResponseSchema = apiResponseSchema(ordersSchema)
export const ordersCreateResponseSchema = z.discriminatedUnion('status', [
  apiResponseSchema(z.object({
    userInfo: z.object({
      address: z.object({
        zipcode: z.number(),
        detail: z.string(),
        city: z.string().optional(),
        county: z.string().optional(),
      }),
      name: z.string(),
      phone: z.string(),
      email: z.string(),
    }),
    _id: z.string(),
    roomId: z.object({
      name: z.string(),
      description: z.string(),
      imageUrl: z.string(),
      imageUrlList: z.array(z.string()),
      areaInfo: z.string(),
      bedInfo: z.string(),
      maxPeople: z.number(),
      price: z.number(),
      status: z.number(),
      layoutInfo: z.array(z.object({
        title: z.string(),
        isProvide: z.boolean(),
      })),
      facilityInfo: z.array(z.object({
        title: z.string(),
        isProvide: z.boolean(),
      })),
      amenityInfo: z.array(z.object({
        title: z.string(),
        isProvide: z.boolean(),
      })),
      _id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
    checkInDate: z.string(),
    checkOutDate: z.string(),
    peopleNum: z.number(),
    orderUserId: z.string(),
    status: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })),
  z.object({
    status: z.literal(false),
    message: z.string(),
  }),
])
export const orderDetailResponseSchema = apiResponseSchema(orderDetailSchema)
export const orderDetailDeleteResponseSchema = apiResponseSchema(z.object({
  userInfo: z.object({
    address: z.object({
      zipcode: z.number(),
      detail: z.string(),
    }),
    name: z.string(),
    phone: z.string(),
    email: z.string(),
  }),
  _id: z.string(),
  roomId: z.object({
    name: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    imageUrlList: z.array(z.string()),
    areaInfo: z.string(),
    bedInfo: z.string(),
    maxPeople: z.number(),
    price: z.number(),
    status: z.number(),
    layoutInfo: z.array(z.object({
      title: z.string(),
      isProvide: z.boolean(),
    })),
    facilityInfo: z.array(z.object({
      title: z.string(),
      isProvide: z.boolean(),
    })),
    amenityInfo: z.array(z.object({
      title: z.string(),
      isProvide: z.boolean(),
    })),
    _id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  peopleNum: z.number(),
  orderUserId: z.string(),
  status: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
}))

export type OrdersResponse = z.infer<typeof ordersResponseSchema>
export type OrdersCreateResponse = z.infer<typeof ordersCreateResponseSchema>
export type OrderDetailResponse = z.infer<typeof orderDetailResponseSchema>
export type OrderDetailDeleteResponse = z.infer<typeof orderDetailDeleteResponseSchema>
