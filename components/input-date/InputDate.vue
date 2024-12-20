<script setup lang="ts">
const modelValue = defineModel<string | Date>()

const props = withDefaults(defineProps<{
  readonly?: boolean
  placeholder?: string
}>(), {
  placeholder: 'yyyy-mm-dd',
})
</script>

<template>
  <input
    :readonly="props.readonly" type="date" :value="modelValue"
    class="form-control p-4 pt-9 text-neutral-100 fw-medium border-neutral-100 rounded-3"
    style="min-height: 74px;" :placeholder="props.placeholder"
  >
</template>

<style scoped lang="scss"></style>
