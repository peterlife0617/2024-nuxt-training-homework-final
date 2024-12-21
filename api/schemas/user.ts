import { z } from 'zod'
import { apiResponseSchema } from '../helper/api-response-schema'

export const userSchema = z.object({
  address: z.object({
    zipcode: z.number(),
    detail: z.string(),
    city: z.string().optional(),
    county: z.string().optional(),
  }),
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  birthday: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const userResponseSchema = apiResponseSchema(userSchema)
export const updateUserResponseSchema = z.discriminatedUnion('status', [
  apiResponseSchema(userSchema),
  z.object({
    status: z.literal(false),
    message: z.string(),
  }),
])

export type UserResponse = z.infer<typeof userResponseSchema>
export type UpdateUserResponse = z.infer<typeof updateUserResponseSchema>
