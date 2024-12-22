import { z } from 'zod'
import { apiResponseSchema } from '../helper/api-response-schema'

export const homeNewsDetailSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const homeNewsDetailResponseSchema = apiResponseSchema(homeNewsDetailSchema)

export type HomeNewsDetailResponse = z.infer<typeof homeNewsDetailResponseSchema>
