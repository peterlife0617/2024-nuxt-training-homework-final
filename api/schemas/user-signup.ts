import { z } from 'zod'
import { apiResponseSchema } from '../helper/api-response-schema'

export const userSignupSchema = z.object({
  address: z.object({
    zipcode: z.number(),
    detail: z.string(),
    city: z.string(),
    county: z.string(),
  }),
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  birthday: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string(),
})

export const userSignupResponseSchema = apiResponseSchema(userSignupSchema).merge(z.object({
  token: z.string(),
}))

export type UserSignupResponse = z.infer<typeof userSignupResponseSchema>
