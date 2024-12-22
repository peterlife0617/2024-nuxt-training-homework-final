import { z } from 'zod'
import { apiResponseSchema } from '../helper/api-response-schema'

export const homeCulinaryDetailSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  diningTime: z.string(),
  image: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const homeCulinaryDetailResponseSchema = apiResponseSchema(homeCulinaryDetailSchema)

export type HomeCulinaryDetailResponse = z.infer<typeof homeCulinaryDetailResponseSchema>
