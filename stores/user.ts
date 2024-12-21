import type { UserResponse } from '~/api/schemas/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserResponse['result'] | null>(null)

  const setUser = (data: UserResponse['result'] | null) => {
    user.value = data
  }

  return {
    user,
    setUser,
  }
})
