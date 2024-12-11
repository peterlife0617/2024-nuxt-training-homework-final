export default defineNuxtPlugin((nuxtApp) => {
  const formatText = (value: string, arg?: string) => {
    if (arg === 'uppercase') {
      return value.toUpperCase()
    }
    else if (arg === 'lowercase') {
      return value.toLowerCase()
    }
    return value
  }

  nuxtApp.vueApp.directive('textformat', {
    mounted(el, { value, arg }) {
      el.textContent = formatText(value, arg)
    },
    getSSRProps({ value, arg }) {
      return {
        textContent: formatText(value, arg),
      }
    },
  })
})
