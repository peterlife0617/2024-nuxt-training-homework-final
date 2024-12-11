/** 登入 */
export interface UserLoginRequest {
  email: string
  password: string
}

/** 登入 */
export interface UserLoginResponse {
  token: string
}
