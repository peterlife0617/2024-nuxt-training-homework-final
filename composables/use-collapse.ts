export function useCollapse(collapseRef: Ref<{
  open: () => void
  close: () => void
  toggle: () => void
  getCollapsed: () => boolean
} | null>) {
  const collapsed = computed(() => {
    return collapseRef.value?.getCollapsed()
  })

  function open() {
    collapseRef.value?.open()
  }

  function close() {
    collapseRef.value?.close()
  }

  function toggle() {
    collapseRef.value?.toggle()
  }

  return {
    collapsed,
    open,
    close,
    toggle,
  }
}
