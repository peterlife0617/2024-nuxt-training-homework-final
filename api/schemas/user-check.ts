import { z } from 'zod'

export const userCheckResponseSchema = z.object({
  status: z.literal(true),
  token: z.string(),
})

export type UserCheckResponseSchema = z.infer<typeof userCheckResponseSchema>
