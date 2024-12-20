import { setupCalendar } from 'v-calendar'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(setupCalendar, {}) // 啟用 setupCalendar 預設設定
})
