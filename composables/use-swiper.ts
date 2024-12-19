import type { Swiper } from '#build/components'

export function useSwiper(swiperRef: Ref<InstanceType<typeof Swiper> | null>) {
  function slidePrev() {
    swiperRef.value?.swiperInstance?.slidePrev()
  }

  function slideNext() {
    swiperRef.value?.swiperInstance?.slideNext()
  }
  return {
    slidePrev,
    slideNext,
  }
}
