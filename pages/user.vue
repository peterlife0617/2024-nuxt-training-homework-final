<script setup lang="ts">
import { useUserApi } from '~/api/services/user'

definePageMeta({
  middleware: 'auth',
})

const { getUser } = useUserApi()
const { setUser } = useUserStore()
await useAsyncData(async () => {
  const response = await getUser()
  setUser(response?.result ?? null)
  return Promise.resolve(true)
})
</script>

<template>
  <NuxtLayout name="user">
    <NuxtPage />
  </NuxtLayout>
</template>

<style scoped lang="scss">
</style>
