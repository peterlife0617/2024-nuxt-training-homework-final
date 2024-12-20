import { z } from 'zod'
import { apiResponseSchema } from '../helper/api-response-schema'

export const roomListSchema = z.array(z.object({
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
}))

export const roomSchema = z.object({
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
})

export const roomResponseSchema = apiResponseSchema(roomSchema)
export const roomListResponseSchema = apiResponseSchema(roomListSchema)

export type RoomResponse = z.infer<typeof roomResponseSchema>
export type RoomListResponse = z.infer<typeof roomListResponseSchema>
