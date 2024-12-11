export interface FailureResponse { status: false, message: string }
export type ApiResponse<T = any> = { status: true, result: T } | FailureResponse
export type ApiResponseWithToken<T = any> = { status: true, token: string, result: T } | FailureResponse
