import { z } from 'zod'

export function apiResponseSchema<TResult = any>(schema: z.ZodType<TResult> = z.any()) {
  return z.object({
    status: z.literal(true),
    result: schema,
  })
}
