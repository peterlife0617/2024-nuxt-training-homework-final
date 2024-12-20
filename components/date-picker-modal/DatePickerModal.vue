<script setup lang="ts">
import type { RoomResponse } from '~/api/schemas/room'
import { Icon } from '@iconify/vue'
import { isNil } from 'lodash-es'
import { DatePicker } from 'v-calendar'
import { useScreens } from 'vue-screen-utils'
import ModalFooter from './components/ModalFooter.vue'
import ModalFooterMobile from './components/ModalFooterMobile.vue'
import ModalHeader from './components/ModalHeader.vue'
import ModalHeaderMobile from './components/ModalHeaderMobile.vue'
import 'v-calendar/style.css'

const emit = defineEmits<{
  (event: 'handleDateChange', data: {
    date: {
      start: string | Date
      end: string | Date
    }

    daysCount: number
    people?: number
  }): void
}>()

const props = defineProps<{
  dateTime: {
    date: {
      start: string | Date
      end: string | Date
    }
    minDate: string | Date
    maxDate: string | Date
  }
  roomData?: RoomResponse['result'] | null
}>()

const masks = {
  title: 'YYYY 年 MM 月',
  modelValue: 'YYYY-MM-DD',
}

const modalRef = useTemplateRef('modal')

const { open, close } = useModal(modalRef)

const { mapCurrent } = useScreens({
  md: '768px',
})

const tempDate = reactive({
  date: {
    start: props.dateTime.date.start,
    end: props.dateTime.date.end,
  },
  minDate: props.dateTime.minDate,
  maxDate: props.dateTime.maxDate,
  key: 0,
})

const bookingPeopleMobile = ref(1)
const isConfirmDateOnMobile = ref(false)

const rows = mapCurrent({ md: 1 }, 2)
const columns = mapCurrent({ md: 2 }, 1)
const expanded = mapCurrent({ md: false }, true)
const titlePosition = mapCurrent({ md: 'center' }, 'left')

const daysCount = computed(() => {
  const startDate = tempDate.date.start
  const endDate = tempDate.date.end

  return diffDays(startDate, endDate)
})

function confirmDateOnMobile() {
  isConfirmDateOnMobile.value = true
}

function confirmDate() {
  const isMobile = mapCurrent({ md: false }, true)

  if (isMobile.value) {
    emit('handleDateChange', {
      date: tempDate.date,
      people: bookingPeopleMobile.value,
      daysCount: daysCount.value,
    })
  }
  else {
    emit('handleDateChange', {
      date: tempDate.date,
      daysCount: daysCount.value,
    })
  }

  close()
}

function clearDate() {
  tempDate.date.start = ''
  tempDate.date.end = ''
  tempDate.key++
}

function isEmptyDate(date?: string | Date | null) {
  return isNil(date) || date === ''
}

defineExpose({
  open,
  close,
})
</script>

<template>
  <Modal
    ref="modal" class="date-picker-modal" fade center modal-dialog-class="m-0 mt-9 mx-md-auto"
    :modal-content-class="[
      { 'mt-auto': isConfirmDateOnMobile },
      'gap-6 gap-md-10 rounded-3xl',
    ]"
  >
    <ModalHeaderMobile class="d-md-none">
      <div class="d-flex flex-column gap-4">
        <button
          type="button" class="btn-close" style="margin-left: -8px !important;"
          @click="close"
        />
        <h3 v-if="tempDate.date.end === null" class="text-neutral-100 fs-6 fw-bold">
          選擇入住與退房日期
        </h3>
        <div v-else class="d-flex align-items-center gap-4">
          <h3 class="modal-title mb-0 text-neutral-100 fs-6 fw-bold">
            {{ daysCount }} 晚
          </h3>
          <div class="d-flex gap-2 text-neutral-80 fs-8 fw-medium">
            <span>{{ formatDate(tempDate.date.start) }}</span>
            -
            <span>{{ formatDate(tempDate.date.end) }}</span>
          </div>
        </div>
      </div>
    </ModalHeaderMobile>
    <ModalHeader class="d-none d-md-flex">
      <div>
        <h3 class="modal-title mb-2 text-neutral-100 fs-5 fw-bold">
          {{ daysCount }} 晚
        </h3>
        <div class="d-flex gap-2 text-neutral-80 fw-medium">
          <span>{{ formatDate(tempDate.date.start) }}</span>
          -
          <span>{{ formatDate(tempDate.date.end) }}</span>
        </div>
      </div>

      <div class="d-flex flex-wrap gap-2 w-50 ms-auto">
        <div class="form-floating flex-grow-1">
          <InputDate id="checkInDate" readonly :model-value="tempDate.date.start" />
          <label class="text-neutral-80 fw-medium" style="top: 8px;left: 8px;" for="checkInDate">入住
          </label>
        </div>

        <div class="form-floating flex-grow-1">
          <InputDate id="checkoutDate" readonly :model-value="tempDate.date.end" />
          <label class="text-neutral-80 fw-medium" style="top: 8px;left: 8px;" for="checkoutDate">退房
          </label>
        </div>
      </div>
    </ModalHeader>
    <div class="modal-body px-6 px-md-8 py-0">
      <div v-if="!isConfirmDateOnMobile" class="date-picker">
        <DatePicker
          :key="tempDate.key" v-model.range.string="tempDate.date" color="primary"
          :masks="masks" :first-day-of-week="1" :min-date="tempDate.minDate"
          :max-date="tempDate.maxDate" :rows="rows" :columns="columns" :expanded="expanded"
          :title-position="titlePosition" class="border-0"
        />
      </div>

      <div v-else>
        <h6 class="mb-1 text-neutral-100 fw-bold">
          選擇人數
        </h6>
        <p class="mb-4 text-neutral-80 fs-8 fw-medium">
          此房型最多供 {{ props.roomData?.maxPeople }} 人居住，不接受寵物入住。
        </p>

        <div class="d-flex align-items-center gap-4">
          <button
            :class="{ 'disabled bg-neutral-40': bookingPeopleMobile === 1 }"
            class="btn btn-neutral-0 p-4 border border-neutral-40 rounded-circle" type="button"
            :disabled="bookingPeopleMobile === 1"
            @click="bookingPeopleMobile--"
          >
            <Icon class="fs-5 text-neutral-100" icon="ic:baseline-minus" />
          </button>

          <h6
            id="people"
            class="d-flex justify-content-center align-items-center mb-0 fw-bold text-neutral-100"
            style="width: 24px;" name="people"
          >
            {{ bookingPeopleMobile }}
          </h6>

          <button
            :class="{
              'disabled bg-neutral-40':
                bookingPeopleMobile
                === props.roomData?.maxPeople,
            }" class="btn btn-neutral-0 p-4 border border-neutral-40 rounded-circle"
            type="button" :disabled="bookingPeopleMobile === props.roomData?.maxPeople"
            @click="bookingPeopleMobile++"
          >
            <Icon class="fs-5 text-neutral-100" icon="ic:baseline-plus" />
          </button>
        </div>
      </div>
    </div>
    <ModalFooter class="d-none d-md-flex">
      <button
        type="button"
        class="btn btn-outline-neutral-80 flex-grow-1 flex-md-grow-0 p-4 fw-bold border-0 rounded-3"
        @click="clearDate"
      >
        清除日期
      </button>
      <button
        type="button"
        class="btn btn-primary-100 flex-grow-1 flex-md-grow-0 px-8 py-4 text-neutral-0 fw-bold rounded-3"
        @click="confirmDate"
      >
        確定日期
      </button>
    </ModalFooter>
    <ModalFooterMobile class="d-md-none">
      <template v-if="isConfirmDateOnMobile">
        <button
          type="button"
          class="btn btn-outline-neutral-80 flex-grow-1 flex-md-grow-0 p-4 fw-bold border-0 rounded-3"
          @click="isConfirmDateOnMobile = false"
        >
          重新選擇日期
        </button>
        <button
          type="button"
          class="btn btn-primary-100 flex-grow-1 flex-md-grow-0 px-8 py-4 text-neutral-0 fw-bold rounded-3"
          @click="confirmDate"
        >
          儲存
        </button>
      </template>
      <template v-else>
        <button
          type="button"
          class="btn btn-outline-neutral-80 flex-grow-1 flex-md-grow-0 p-4 fw-bold border-0 rounded-3"
          @click="clearDate"
        >
          清除日期
        </button>
        <button
          type="button"
          class="btn btn-primary-100 flex-grow-1 flex-md-grow-0 px-8 py-4 text-neutral-0 fw-bold rounded-3"
          :disabled="isEmptyDate(tempDate.date.start) || isEmptyDate(tempDate.date.end)"
          @click="confirmDateOnMobile"
        >
          確定日期
        </button>
      </template>
    </ModalFooterMobile>
  </Modal>
</template>

<style lang="scss" scoped>
.date-picker-modal {
  backdrop-filter: blur(10px);
}
.date-picker-modal :deep(.modal-dialog) {
  max-width: 740px;
}

.date-picker :deep(.vc-primary) {
  --vc-accent-50: #f0f9ff;
  --vc-accent-100: #e0f2fe;
  --vc-accent-200: #f9f9f9;
  --vc-accent-300: #7dd3fc;
  --vc-accent-400: #38bdf8;
  --vc-accent-500: #0ea5e9;
  --vc-accent-600: #000;
  --vc-accent-700: #fff;
  --vc-accent-800: #f9f9f9;
  --vc-accent-900: #000;
}

.date-picker :deep(.vc-container) {
  --vc-font-family: : 'Noto Serif TC', serif;
}

.date-picker :deep(.vc-pane-layout) {
  gap: 60px;
}

.date-picker :deep(.vc-header) {
  margin-bottom: 4px;
}

.date-picker :deep(.vc-title) {
  font-size: 1.25rem;
  font-weight: bold;
  color: #000;
  background-color: transparent;
}

.date-picker :deep(.vc-arrow) {
  width: 24px;
  height: 24px;
  background-color: transparent;
}

.date-picker :deep(.vc-base-icon) {
  width: 12px;
  stroke: #000;
}

.date-picker :deep(.vc-weeks) {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0;
}

.date-picker :deep(.vc-weekday) {
  --vc-weekday-color: #4b4b4b;

  padding: 12px 14px 8px;
  font-size: var(--vc-text-base);
  font-weight: 500;
  line-height: unset;
}

.date-picker :deep(.vc-day-content) {
  width: 44px;
  height: 44px;
  font-size: var(--vc-text-base);
}

.date-picker :deep(.vc-highlight) {
  width: 44px;
  height: 44px;
}

.date-picker :deep(.vc-attr) {
  --vc-highlight-outline-bg: #000;
}
</style>
