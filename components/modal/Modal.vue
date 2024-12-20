<script setup lang="ts">
import type { Modal } from 'bootstrap'
import type { ClassValue } from '~/types/class'

const props = withDefaults(defineProps<{
  modalDialogClass?: ClassValue
  modalContentClass?: ClassValue
  center?: boolean
  fade?: boolean
}>(), {
  center: true,
  fade: true,
})

const modalElRef = useTemplateRef('modalEl')

const { $modal } = useNuxtApp()

const modal = ref<Modal>()

const modalClass = computed(() => {
  return [{
    fade: props.fade,
  }]
})

const modalDialogClass = computed(() => {
  const classes = Array.isArray(props.modalDialogClass) ? props.modalDialogClass : [props.modalDialogClass]
  return [
    {
      'modal-dialog-centered': props.center,
    },
    ...classes,
  ]
})
const modalContentClass = computed(() => {
  const classes = Array.isArray(props.modalContentClass) ? props.modalContentClass : [props.modalContentClass]
  return classes
})

function open() {
  modal.value?.show()
}

function close() {
  modal.value?.hide()
}

onMounted(() => {
  if (modalElRef.value) {
    modal.value = new $modal(modalElRef.value)
  }
})

onUnmounted(() => {
  modal.value?.dispose()
})

defineExpose({
  open,
  close,
})
</script>

<template>
  <div ref="modalEl" class="modal" :class="modalClass" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog" :class="modalDialogClass">
      <div class="modal-content" :class="modalContentClass">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  backdrop-filter: blur(10px);
}

.modal-dialog {
  max-width: 740px;
}
</style>
