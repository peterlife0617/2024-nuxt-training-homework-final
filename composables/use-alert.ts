import type { SweetAlertIcon } from 'sweetalert2'

export function useAlert() {
  const { $swal } = useNuxtApp()

  const alert = async (icon: SweetAlertIcon, title: string) => {
    await $swal.fire({
      position: 'center',
      icon,
      title,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const success = async (title: string) => {
    await alert('success', title)
  }

  const error = async (title: string) => {
    await alert('error', title)
  }

  return {
    alert,
    success,
    error,
  }
}
