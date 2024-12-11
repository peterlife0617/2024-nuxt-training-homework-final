import Swal from 'sweetalert2'

export default defineNuxtPlugin(() => {
  // 兩個寫法都可以，但第一種寫法 typescript 會沒有提示
  // nuxtApp.provide('swal', Swal)
  return {
    provide: {
      swal: Swal,
    },
  }
})
