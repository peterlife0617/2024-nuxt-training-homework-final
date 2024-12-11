<script setup lang="ts">
import type { SwiperOptions } from 'swiper/types'

import type { PropType } from 'vue'
//  Swiper JS 核心功能
import Swiper from 'swiper'
// Swiper 核心與模組的樣式
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps({
  autoplay: Object as PropType<SwiperOptions['autoplay']>,
  pagination: Object as PropType<SwiperOptions['pagination']>,
  navigation: Object as PropType<SwiperOptions['navigation']>,
  loop: Boolean,
  slidesPerView: Number,
  modules: Array as PropType<SwiperOptions['modules']>,
  breakpoints: Object as PropType<SwiperOptions['breakpoints']>,
})

const swiperInstance = shallowRef<Swiper | null>(null)
const swiperRef = useTemplateRef('swiperRef')
onMounted(() => {
  if (swiperRef.value) {
    swiperInstance.value = new Swiper(swiperRef.value, props)
  }
})
</script>

<template>
  <div ref="swiperRef" class="swiper">
    <div class="swiper-wrapper">
      <slot />
    </div>
    <div class="swiper-pagination" />

    <div class="swiper-button-next" />
    <div class="swiper-button-prev" />
  </div>
</template>
