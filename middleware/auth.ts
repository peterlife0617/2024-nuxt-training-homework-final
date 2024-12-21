import { useUserCheckApi } from '~/api/services/user-check'
import { CookieEnum } from '~/enums/cookie'

export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp()

  const isClientHydrating = import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered
  if (
    isClientHydrating
  ) {
    return
  }

  // middleware 要執行的 code 寫在這邊

  const token = useCookie(CookieEnum.Auth)
  if (!token.value) {
    return navigateTo('/account/login')
  }

  const { userCheck } = useUserCheckApi()

  const response = await userCheck()

  if (!response?.status) {
    return navigateTo('/account/login')
  }

  return true
})
