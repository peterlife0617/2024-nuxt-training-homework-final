import { z } from 'zod'
import { apiResponseSchema } from '../helper/api-response-schema'

export const homeCulinaryListSchema = z.array(z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  diningTime: z.string(),
  image: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}))

export const homeCulinarySchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  diningTime: z.string(),
  image: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const homeCulinaryResponseSchema = apiResponseSchema(homeCulinarySchema)
export const homeCulinaryListResponseSchema = apiResponseSchema(homeCulinaryListSchema)

export type HomeCulinaryResponseSchema = z.infer<typeof homeCulinaryResponseSchema>
export type HomeCulinaryListResponseSchema = z.infer<typeof homeCulinaryListResponseSchema>
