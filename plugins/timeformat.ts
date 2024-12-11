export default defineNuxtPlugin((nuxtApp) => {
  const formatTime = (value: any) => {
    const date = new Date(value)
    return new Intl.DateTimeFormat('zh-Hant', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date).replace(/\//g, '-')
  }

  nuxtApp.vueApp.directive('timeformat', {
    mounted(el, { value }) {
      el.textContent = formatTime(value)
    },
    getSSRProps({ value }) {
      return {
        textContent: formatTime(value),
      }
    },
  })
})
