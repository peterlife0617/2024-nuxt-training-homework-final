import { z } from 'zod'

export const userForgetResponseSchema = z.object({
  status: z.literal(true),
})

export type UserForgetResponse = z.infer<typeof userForgetResponseSchema>
