import type { ZodType, ZodTypeAny } from 'zod'

export interface ValidateOptions<TResponse = any> {
  responseSchema?: ZodType<TResponse>
  querySchema?: ZodTypeAny
  bodySchema?: ZodTypeAny
  paramsSchema?: ZodTypeAny
}
