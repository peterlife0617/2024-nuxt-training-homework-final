import { SchemaError } from '~/utils/error'

export function apiErrorHandler(error: unknown) {
  if (error instanceof SchemaError) {
    const { message, cause } = error
    console.error(message, cause)
    return
  }

  return Promise.reject(error)
}
