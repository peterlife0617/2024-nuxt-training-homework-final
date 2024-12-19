class ReadError extends Error {
  override cause: unknown

  constructor(message: string, cause?: unknown) {
    super(message)
    this.cause = cause
    this.name = 'ReadError'
  }
}

export class SchemaError extends ReadError {
  constructor(message: string, cause: unknown) {
    super(message, cause)
    this.name = 'SchemaError'
    Error.captureStackTrace(this, SchemaError)
  }
}
