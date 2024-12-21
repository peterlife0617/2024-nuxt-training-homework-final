import { z } from 'zod'

export const userLoginSchema = z.object({
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

export const userLoginResponseSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal(true), token: z.string(), result: userLoginSchema }),
  z.object({ status: z.literal(false), message: z.string() }),
])
export type UserLoginResponse = z.infer<typeof userLoginResponseSchema>
