import { Collapse, Modal } from 'bootstrap'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      modal: Modal,
      collapse: Collapse,
    },
  }
})
