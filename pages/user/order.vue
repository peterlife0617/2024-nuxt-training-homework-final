<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useOrdersApi } from '~/api/services/orders'
import { OrderStatusEnum } from '~/enums/order-status'

definePageMeta({
  name: 'user-order',
})

const { getOrders, deleteOrderDetail } = useOrdersApi()
const { data, refresh } = await useAsyncData(() => getOrders(), {
  transform: (data) => {
    return data?.result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },
})

const { success } = useAlert()
const cancelModalRef = useTemplateRef('cancelModal')
const { open, close } = useModal(cancelModalRef)

const isShowMore = ref(false)

const orders = computed(() => {
  return isShowMore.value ? data.value : data.value?.slice(0, 3)
})

const firstComingOrder = computed(() => {
  if (!data.value) {
    return null
  }

  const comingOrders = data.value.filter(order => new Date().getTime() <= new Date(order.checkInDate).getTime() && order.status === OrderStatusEnum.InProgress)
  return comingOrders.sort((a, b) => new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime())[0]
})

async function onConfirm() {
  if (!firstComingOrder.value?._id) {
    return
  }
  await deleteOrderDetail(firstComingOrder.value?._id)
  success('取消成功')
  close()
  refresh()
}
</script>

<template>
  <div class="row gap-6 gap-md-0">
    <div class="col-12 col-md-7">
      <div
        v-if="firstComingOrder"
        class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0"
        style="max-width: 730px;"
      >
        <div>
          <p class="mb-2 text-neutral-80 fs-8 fs-md-7 fw-medium">
            預訂參考編號： {{ firstComingOrder._id }}
          </p>
          <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">
            即將來的行程
          </h2>
        </div>

        <img
          class="img-fluid rounded-3"
          :src="firstComingOrder.roomId.imageUrl"
          alt="room image"
        >

        <section class="d-flex flex-column gap-6">
          <h3 class="d-flex align-items-center mb-0 text-neutral-80 fs-8 fs-md-6 fw-bold">
            <p class="mb-0">
              {{ firstComingOrder.roomId.name }}，{{ diffDays(firstComingOrder.checkInDate, firstComingOrder.checkOutDate) }} 晚
            </p>
            <span
              class="d-inline-block mx-4 bg-neutral-80"
              style="width: 1px;height: 18px;"
            />
            <p class="mb-0">
              住宿人數：{{ firstComingOrder.peopleNum }} 位
            </p>
          </h3>

          <div class="text-neutral-80 fs-8 fs-md-7 fw-bold">
            <p class="title-deco mb-2">
              入住：{{ formatDate(firstComingOrder.checkInDate, 'M 月 D 日dddd') }}，15:00 可入住
            </p>
            <p
              class="title-deco mb-0"
            >
              退房：{{ formatDate(firstComingOrder.checkOutDate, 'M 月 D 日dddd') }}，12:00 前退房
            </p>
          </div>

          <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-bold">
            {{ formatCurrency(firstComingOrder.roomId.price) }}
          </p>
        </section>

        <hr class="my-0 opacity-100 text-neutral-40">

        <section>
          <h3 class="title-deco mb-6 text-neutral-100 fs-8 fs-md-7 fw-bold">
            房內設備
          </h3>
          <ul class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 border border-neutral-40 rounded-3 list-unstyled">
            <li v-for="(facility, index) in firstComingOrder.roomId.facilityInfo" :key="index" class="flex-item d-flex gap-2">
              <Icon
                class="fs-5 text-primary-100"
                icon="material-symbols:check"
              />
              <p class="mb-0 text-neutral-80 fw-bold">
                {{ facility.title }}
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h3 class="title-deco mb-6 text-neutral-100 fs-8 fs-md-7 fw-bold">
            備品提供
          </h3>
          <ul class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 border border-neutral-40 rounded-3 list-unstyled">
            <li v-for="(amenity, index) in firstComingOrder.roomId.amenityInfo" :key="index" class="flex-item d-flex gap-2">
              <Icon
                class="fs-5 text-primary-100"
                icon="material-symbols:check"
              />
              <p class="mb-0 text-neutral-80 fw-bold">
                {{ amenity.title }}
              </p>
            </li>
          </ul>
        </section>

        <div class="d-flex gap-4">
          <button
            class="btn btn-outline-primary-100 w-50 py-4 fw-bold"
            style="

--bs-btn-hover-color: #fff"
            type="button"
            @click="open"
          >
            取消預訂
          </button>
          <NuxtLink
            class="btn btn-primary-100 text-neutral-0 w-50 py-4 fw-bold"
            :to="{
              name: 'room-detail',
              params: {
                roomId: firstComingOrder.roomId._id,
              },
            }"
          >
            查看詳情
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-5">
      <div
        class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0"
      >
        <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">
          歷史訂單
        </h2>

        <template v-for="order in orders" :key="order._id">
          <div class="d-flex flex-column flex-lg-row gap-6">
            <img
              class="img-fluid object-fit-cover rounded-3"
              style="max-width: 120px; height: 80px;"
              :src="order.roomId.imageUrl"
              alt="room image"
            >
            <section class="d-flex flex-column gap-4">
              <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
                預訂參考編號： {{ order._id }}
              </p>
              <h3 class="d-flex align-items-center mb-0 text-neutral-80 fs-8 fs-md-6 fw-bold">
                {{ order.roomId.name }}
              </h3>
              <div class="text-neutral-80 fw-medium">
                <p class="mb-2">
                  住宿天數： {{ diffDays(order.checkInDate, order.checkOutDate) }} 晚
                </p>
                <p class="mb-0">
                  住宿人數：{{ order.peopleNum }} 位
                </p>
              </div>
              <div class="text-neutral-80 fs-8 fs-md-7 fw-medium">
                <p class="title-deco mb-2">
                  入住：{{ formatDate(order.checkInDate, 'M 月 D 日dddd') }}，15:00 可入住
                </p>
                <p
                  class="title-deco mb-0"
                >
                  退房：{{ formatDate(order.checkOutDate, 'M 月 D 日dddd') }}，12:00 前退房
                </p>
              </div>
              <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-bold">
                {{ formatCurrency(order.roomId.price) }}
              </p>
            </section>
          </div>
          <hr class="my-0 opacity-100 text-neutral-40">
        </template>

        <button
          v-if="!isShowMore"
          class="btn btn-outline-primary-100 py-4 fw-bold"
          style="

--bs-btn-hover-color: #fff"
          type="button"
          @click="isShowMore = true"
        >
          查看更多
        </button>
      </div>
    </div>
  </div>
  <Modal id="cancelModal" ref="cancelModal" fade center modal-dialog-class="align-items-end align-items-md-center m-0 mx-md-auto h-100">
    <div class="modal-header">
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="close"
      />
    </div>
    <div class="modal-body mx-auto my-10 my-md-15 text-neutral-80 fs-8 fs-md-6 fw-bold">
      確定要取消此房型的預訂嗎？
    </div>
    <div class="modal-footer d-flex gap-4">
      <button
        type="button"
        class="btn btn-outline-primary-100 flex-grow-1 m-0 py-4 fw-bold"
        style="

--bs-btn-hover-color: #fff"
        @click="close"
      >
        關閉視窗
      </button>
      <button
        type="button"
        class="btn btn-primary-100 flex-grow-1 m-0 py-4 text-white fw-bold"
        @click="onConfirm"
      >
        確定取消
      </button>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
@import 'bootstrap/scss/mixins/breakpoints';

$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
  xxxl: 1537px,
);

.rounded-3xl {
  border-radius: 1.25rem;
}

.title-deco {
  display: flex;
  align-items: center;
}

.title-deco::before {
  --color: #bf9d7d;

  display: inline-block;
  width: 4px;
  height: 24px;
  margin-right: 0.75rem;
  content: '';
  background-color: var(--color);
  border-radius: 10px;
}

.title-deco:nth-child(2)::before {
  --color: #909090;
}

.flex-item {
  width: 100%;
  max-width: 97px;
  white-space: nowrap;
}

.modal {
  backdrop-filter: blur(10px);

  @include media-breakpoint-down(md) {
    backdrop-filter: none;
  }
  :deep(.modal-header) {
    @include media-breakpoint-down(md) {
      border-bottom: 0 !important;
    }
  }

  :deep(.modal-content) {
    @include media-breakpoint-down(md) {
      border-bottom-right-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
  }
}
</style>
