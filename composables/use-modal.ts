export function useModal(modalRef: Ref<{
  open: () => void
  close: () => void
} | null>) {
  function open() {
    modalRef.value?.open()
  }

  function close() {
    modalRef.value?.close()
  }

  return {
    open,
    close,
  }
}
