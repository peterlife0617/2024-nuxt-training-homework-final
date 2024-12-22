<script setup lang="ts">
import type { Collapse } from 'bootstrap'

const { $collapse } = useNuxtApp()
const collapseRef = useTemplateRef('collapse')
const collapseInstance = ref<Collapse | null>(null)
const collapsed = ref(true)

function close() {
  collapseInstance.value?.hide()
}

function open() {
  collapseInstance.value?.show()
}

function toggle() {
  collapseInstance.value?.toggle()
}

function setCollapsedFalse() {
  collapsed.value = false
}

function setCollapsedTrue() {
  collapsed.value = true
}

onMounted(() => {
  if (collapseRef.value) {
    collapseInstance.value = new $collapse(collapseRef.value, {
      toggle: !collapsed.value,
    })
  }

  collapseRef.value?.addEventListener('hidden.bs.collapse', setCollapsedTrue)
  collapseRef.value?.addEventListener('shown.bs.collapse', setCollapsedFalse)
})

onUnmounted(() => {
  collapseInstance.value?.dispose()

  collapseRef.value?.removeEventListener('hidden.bs.collapse', setCollapsedTrue)
  collapseRef.value?.removeEventListener('shown.bs.collapse', setCollapsedFalse)
})

defineExpose({
  close,
  open,
  toggle,
  getCollapsed: () => collapsed.value,
})
</script>

<template>
  <div ref="collapse" class="collapse">
    <slot />
  </div>
</template>

<style scoped lang="scss">
</style>
