<script setup lang="ts">
import { useUserApi } from '~/api/services/user'

definePageMeta({
  middleware: 'auth',
})

const { getUser } = useUserApi()
const { data } = await useAsyncData(() => {
  return getUser()
}, {
  transform: (data) => {
    return data?.result
  },
})
</script>

<template>
  <NuxtLayout name="user" :user="data">
    <NuxtPage :user="data" />
  </NuxtLayout>
</template>

<style scoped lang="scss">
</style>
