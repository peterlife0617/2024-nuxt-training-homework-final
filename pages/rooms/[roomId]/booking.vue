<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useOrdersApi } from '~/api/services/orders'
import { useUserApi } from '~/api/services/user'

definePageMeta({
  name: 'booking',
  middleware: ['auth', (to) => {
    const { order } = storeToRefs(useOrderStore())
    if (!order.value) {
      return navigateTo({
        name: 'room-detail',
        params: {
          roomId: to.params.roomId,
        },
      })
    }

    return true
  }],
})

const DISCOUNT = 1000

const router = useRouter()
const { order } = storeToRefs(useOrderStore())
const { setOrder } = useOrderStore()
const { getUser } = useUserApi()
const { createOrder } = useOrdersApi()
const formRef = useTemplateRef('form')
const { pending: createOrderPending, execute: executeCreateOrder } = useApiControl(createOrder)
const { error } = useAlert()

const daysCount = computed(() => {
  return diffDays(order.value?.checkInDate, order.value?.checkOutDate)
})

function goBack() {
  router.back()
}

async function onSubmit(values: {
  userInfo?: {
    name?: string
    phone?: string
    email?: string
    address?: {
      zipcode?: string
      detail?: string
      county?: string
      city?: string
    }
  }
}) {
  const response = await executeCreateOrder({
    ...order.value,
    userInfo: values.userInfo,
  })

  if (!response?.status) {
    error(response?.message || '訂房失敗')
    return
  }

  // 清除訂房資訊
  setOrder(null)

  router.push({
    name: 'booking-confirmation',
    params: {
      bookingId: response?.result._id,
    },
  })
}

async function applyUserData() {
  const response = await getUser()
  if (!response?.result) {
    return
  }
  formRef.value?.setFieldValue('userInfo.name', response.result.name)
  formRef.value?.setFieldValue('userInfo.phone', response.result.phone)
  formRef.value?.setFieldValue('userInfo.email', response.result.email)
  formRef.value?.setFieldValue('userInfo.address.zipcode', response.result.address.zipcode)
  formRef.value?.setFieldValue('userInfo.address.detail', response.result.address.detail)
  formRef.value?.setFieldValue('userInfo.address.county', response.result.address.county)
  formRef.value?.setFieldValue('userInfo.address.city', response.result.address.city)
}
</script>

<template>
  <main class="pt-18 pt-md-30 bg-neutral-120">
    <section class="py-10 py-md-30 bg-primary-10">
      <div class="container">
        <button
          class="d-flex align-items-baseline gap-2 mb-10 bg-transparent border-0"
          type="button" @click="goBack"
        >
          <Icon class="fs-5 text-neutral-100" icon="mdi:keyboard-arrow-left" />
          <h1 class="mb-0 text-neutral-100 fs-3 fw-bold">
            確認訂房資訊
          </h1>
        </button>

        <VForm v-slot="{ errors }" ref="form" class="row gap-10 gap-md-0" @submit="onSubmit">
          <div class="col-12 col-md-7">
            <section>
              <h2 class="mb-8 mb-md-10 text-neutral-100 fs-6 fs-md-4 fw-bold">
                訂房資訊
              </h2>
              <div class="d-flex flex-column gap-6">
                <div class="d-flex justify-content-between align-items-center text-neutral-100">
                  <div>
                    <h3 class="title-deco mb-2 fs-7 fw-bold">
                      選擇房型
                    </h3>
                    <p class="mb-0 fw-medium">
                      {{ order?.roomInfo.name }}
                    </p>
                  </div>
                  <button
                    class="bg-transparent border-0 fw-bold text-decoration-underline"
                    type="button"
                  >
                    編輯
                  </button>
                </div>
                <div class="d-flex justify-content-between align-items-center text-neutral-100">
                  <div>
                    <h3 class="title-deco mb-2 fs-7 fw-bold">
                      訂房日期
                    </h3>
                    <p class="mb-2 fw-medium">
                      入住：{{ formatDate(order?.checkInDate, 'M 月 D 日dddd') }}
                    </p>
                    <p class="mb-0 fw-medium">
                      退房：{{ formatDate(order?.checkOutDate, 'M 月 D 日dddd') }}
                    </p>
                  </div>
                  <button
                    class="bg-transparent border-0 fw-bold text-decoration-underline"
                    type="button"
                  >
                    編輯
                  </button>
                </div>
                <div class="d-flex justify-content-between align-items-center text-neutral-100">
                  <div>
                    <h3 class="title-deco mb-2 fs-7 fw-bold">
                      房客人數
                    </h3>
                    <p class="mb-0 fw-medium">
                      {{ order?.peopleNum }} 人
                    </p>
                  </div>
                  <button
                    class="bg-transparent border-0 fw-bold text-decoration-underline"
                    type="button"
                  >
                    編輯
                  </button>
                </div>
              </div>
            </section>

            <hr class="my-10 my-md-12 opacity-100 text-neutral-60">

            <section>
              <div class="d-flex justify-content-between align-items-center mb-10">
                <h2 class="mb-0 text-neutral-100 fs-6 fs-md-4 fw-bold">
                  訂房人資訊
                </h2>
                <button
                  class="text-primary-100 bg-transparent border-0 fw-bold text-decoration-underline"
                  type="button" @click="applyUserData"
                >
                  套用會員資料
                </button>
              </div>

              <div class="d-flex flex-column gap-6">
                <div class="text-neutral-100">
                  <label for="name" class="form-label fs-8 fs-md-7 fw-bold">姓名</label>
                  <VField
                    id="name" type="text" class="form-control p-4 fs-8 fs-md-7 rounded-3"
                    placeholder="請輸入姓名" name="userInfo.name"
                    :class="{ 'is-invalid': errors['userInfo.name'] }" rules="required"
                    label="姓名"
                  />
                  <VErrorMessage name="userInfo.name" class="invalid-feedback" />
                </div>

                <div class="text-neutral-100">
                  <label for="phone" class="form-label fs-8 fs-md-7 fw-bold">手機號碼</label>
                  <VField
                    id="phone" type="tel" class="form-control p-4 fs-8 fs-md-7 rounded-3"
                    placeholder="請輸入手機號碼" name="userInfo.phone"
                    :class="{ 'is-invalid': errors['userInfo.phone'] }" rules="required"
                    label="手機號碼"
                  />
                  <VErrorMessage name="userInfo.phone" class="invalid-feedback" />
                </div>

                <div class="text-neutral-100">
                  <label for="email" class="form-label fs-8 fs-md-7 fw-bold">電子信箱</label>
                  <VField
                    id="email" type="email" class="form-control p-4 fs-8 fs-md-7 rounded-3"
                    placeholder="請輸入電子信箱" name="userInfo.email"
                    :class="{ 'is-invalid': errors['userInfo.email'] }" rules="required"
                    label="電子信箱"
                  />
                  <VErrorMessage name="userInfo.email" class="invalid-feedback" />
                </div>

                <div class="text-neutral-100">
                  <label for="address" class="form-label fs-8 fs-md-7 fw-bold">地址</label>
                  <div class="d-flex gap-2 mb-4">
                    <div class="flex-grow-1">
                      <VField
                        class="form-select p-4 " as="select" name="userInfo.address.city"
                        :class="{ 'is-invalid': errors['userInfo.address.city'] }" rules="required"
                        label="縣市"
                      >
                        <option value="">
                          請選擇
                        </option>
                        <option value="臺北市">
                          臺北市
                        </option>
                        <option value="臺中市">
                          臺中市
                        </option>
                        <option value="高雄市">
                          高雄市
                        </option>
                      </VField>
                      <VErrorMessage name="userInfo.address.city" class="invalid-feedback" />
                    </div>
                    <div class="flex-grow-1">
                      <VField
                        as="select"
                        class="form-select p-4 text-neutral-80 fs-8 fs-md-7 fw-medium rounded-3"
                        name="userInfo.address.county"
                        :class="{ 'is-invalid': errors['userInfo.address.county'] }"
                        rules="required" label="鄉鎮市區"
                      >
                        <option value="">
                          請選擇
                        </option>
                        <option value="前金區">
                          前金區
                        </option>
                        <option value="鹽埕區">
                          鹽埕區
                        </option>
                        <option value="新興區">
                          新興區
                        </option>
                      </VField>
                      <VErrorMessage name="userInfo.address.county" class="invalid-feedback" />
                    </div>
                  </div>
                  <VField
                    id="address" type="text" class="form-control p-4 fs-8 fs-md-7 rounded-3"
                    placeholder="請輸入詳細地址" name="userInfo.address.detail"
                    :class="{ 'is-invalid': errors['userInfo.address.detail'] }" rules="required"
                    label="詳細地址"
                  />
                  <VErrorMessage name="userInfo.address.detail" class="invalid-feedback" />
                </div>
              </div>
            </section>

            <hr class="my-10 my-md-12 opacity-100 text-neutral-60">

            <section>
              <h2 class="mb-8 mb-md-10 text-neutral-100 fs-6 fs-md-4 fw-bold">
                房間資訊
              </h2>
              <div class="d-flex flex-column gap-6">
                <section>
                  <h3 class="title-deco mb-4 mb-md-6 fs-7 fs-md-5 fw-bold">
                    房型基本資訊
                  </h3>
                  <ul class="d-flex gap-4 list-unstyled">
                    <li class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3">
                      <Icon class="mb-2 fs-5 text-primary-100" icon="fluent:slide-size-24-filled" />
                      <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                        {{ order?.roomInfo.areaInfo }}
                      </p>
                    </li>
                    <li class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3">
                      <Icon class="mb-2 fs-5 text-primary-100" icon="material-symbols:king-bed" />
                      <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                        {{ order?.roomInfo.bedInfo }}
                      </p>
                    </li>
                    <li class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3">
                      <Icon class="mb-2 fs-5 text-primary-100" icon="ic:baseline-person" />
                      <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                        {{ order?.roomInfo.maxPeople }} 人
                      </p>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold">
                    房間格局
                  </h3>
                  <ul
                    class="d-flex flex-wrap gap-6 gap-md-10 p-6 fs-8 fs-md-7 bg-neutral-0 rounded-3 list-unstyled"
                  >
                    <li
                      v-for="(layout, index) in order?.roomInfo.layoutInfo" :key="index"
                      class="d-flex gap-2"
                    >
                      <Icon class="fs-5 text-primary-100" icon="material-symbols:check" />
                      <p class="mb-0 text-neutral-80 fw-bold">
                        {{ layout.title }}
                      </p>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold">
                    房內設備
                  </h3>
                  <ul
                    class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 rounded-3 list-unstyled"
                  >
                    <li
                      v-for="(facility, index) in order?.roomInfo.facilityInfo" :key="index"
                      class="flex-item d-flex gap-2"
                    >
                      <Icon class="fs-5 text-primary-100" icon="material-symbols:check" />
                      <p class="mb-0 text-neutral-80 fw-bold">
                        {{ facility.title }}
                      </p>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold">
                    備品提供
                  </h3>
                  <ul
                    class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 rounded-3 list-unstyled"
                  >
                    <li
                      v-for="(amenity, index) in order?.roomInfo.amenityInfo" :key="index"
                      class="flex-item d-flex gap-2"
                    >
                      <Icon class="fs-5 text-primary-100" icon="material-symbols:check" />
                      <p class="mb-0 text-neutral-80 fw-bold">
                        {{ amenity.title }}
                      </p>
                    </li>
                  </ul>
                </section>
              </div>
            </section>
          </div>

          <div class="col-12 col-md-5">
            <div
              class="confirm-form rounded-3xl d-flex flex-column gap-10 p-6 p-md-10 mx-auto ms-md-auto me-md-0 bg-neutral-0"
            >
              <img class="img-fluid rounded-3" src="/images/room-a-1.png" alt="room-a">

              <div>
                <h2 class="mb-6 text-neutral-100 fs-6 fs-md-4 fw-bold">
                  價格詳情
                </h2>
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center text-neutral-100 fw-medium">
                    <span>{{ formatCurrency(order?.roomInfo.price) }}</span>
                    <Icon class="ms-2 me-1 text-neutral-80" icon="material-symbols:close" />
                    <span class="text-neutral-80">{{ daysCount }} 晚</span>
                  </div>
                  <span class="fw-medium">
                    {{ formatCurrency((order?.roomInfo.price ?? 0) * daysCount) }}
                  </span>
                </div>
                <div class="d-flex justify-content-between align-items-center fw-medium">
                  <p class="d-flex align-items-center mb-0 text-neutral-100">
                    住宿折扣
                  </p>
                  <span class="text-primary-100">
                    {{ `-${formatCurrency(DISCOUNT)}` }}
                  </span>
                </div>
                <hr class="my-6 opacity-100 text-neutral-40">
                <div
                  class="d-flex justify-content-between align-items-center text-neutral-100 fw-bold"
                >
                  <p class="d-flex align-items-center mb-0">
                    總價
                  </p>
                  <span>
                    {{ formatCurrency((order?.roomInfo.price ?? 0) * daysCount - DISCOUNT) }}
                  </span>
                </div>
              </div>

              <button
                class="btn btn-primary-100 py-4 text-neutral-0 fw-bold rounded-3"
                type="submit"
              >
                確認訂房
              </button>
            </div>
          </div>
        </VForm>
      </div>
    </section>

    <RoomsBookingLoading v-if="createOrderPending" />
  </main>
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

.title-deco {
  display: flex;
  align-items: center;
}

.title-deco::before {
  display: inline-block;
  width: 4px;
  height: 24px;
  margin-right: 0.75rem;
  content: '';
  background-color: #bf9d7d;
  border-radius: 10px;
}

.form-control::placeholder {
  --neutral-60: #909090;

  font-weight: 500;
  color: var(--neutral-60);
}

.card-info {
  width: 97px;
  height: 97px;
}

.flex-item {
  flex: 0 1 15%;

  @include media-breakpoint-down(md) {
    flex-basis: 40%;
  }
}

.rounded-3xl {
  border-radius: 1.25rem;
}

.confirm-form {
  position: sticky;
  top: 160px;
  max-width: 478px;

  @include media-breakpoint-down(md) {
    position: static;
    top: 0;
    max-width: auto;
  }
}
</style>
