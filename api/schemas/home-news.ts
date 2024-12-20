import { z } from 'zod'
import { apiResponseSchema } from '../helper/api-response-schema'

export const homeNewsListSchema = z.array(z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}))

export const homeNewsSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const homeNewsResponseSchema = apiResponseSchema(homeNewsSchema)
export const homeNewsListResponseSchema = apiResponseSchema(homeNewsListSchema)

export type HomeNewsResponse = z.infer<typeof homeNewsResponseSchema>
export type HomeNewsListResponse = z.infer<typeof homeNewsListResponseSchema>
