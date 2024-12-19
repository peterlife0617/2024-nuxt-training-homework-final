<script setup lang="ts">
import type { SwiperOptions } from 'swiper/types'
//  Swiper JS 核心功能
import Swiper from 'swiper'
// Swiper 核心與模組的樣式
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps<{
  autoplay?: SwiperOptions['autoplay']
  pagination?: SwiperOptions['pagination']
  navigation?: SwiperOptions['navigation']
  loop?: SwiperOptions['loop']
  slidesPerView: SwiperOptions['slidesPerView']
  modules?: SwiperOptions['modules']
  breakpoints?: SwiperOptions['breakpoints']
}>()

const swiperInstance = shallowRef<Swiper | null>(null)
const swiperElRef = useTemplateRef('swiperEl')
onMounted(() => {
  if (swiperElRef.value) {
    swiperInstance.value = new Swiper(swiperElRef.value, props)
  }
})

defineExpose({
  swiperInstance,
})
</script>

<template>
  <div ref="swiperEl" class="swiper">
    <div class="swiper-wrapper">
      <slot />
    </div>
    <div class="swiper-pagination" />

    <div class="swiper-button-next" />
    <div class="swiper-button-prev" />
  </div>
</template>
