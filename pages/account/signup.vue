<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { pick } from 'lodash-es'
import { useUserSignupApi } from '~/api/services/user-signup'
import { CookieEnum } from '~/enums/cookie'

interface Step1Values {
  email: string
  password: string
  confirmPassword: string
}

interface Step2Values {
  name: string
  phone: string
  birthday: string
  address: {
    zipcode: null | number
    detail: string
    county: string
    city: string
  }
}

definePageMeta({
  name: 'signup',
})

const initialValues: {
  step1: Step1Values
  step2: Step2Values
} = {
  step1: {
    email: '',
    password: '',
    confirmPassword: '',
  },
  step2: {
    name: '',
    phone: '',
    birthday: '',
    address: {
      zipcode: null,
      detail: '',
      county: '',
      city: '',
    },
  },
}

const { signup } = useUserSignupApi()

const step1FormRef = useTemplateRef('step1Form')
const { error, success } = useAlert()
const router = useRouter()
const { setUser } = useUserStore()

const isEmailAndPasswordValid = ref(false)
const isAgree = ref(false)

if (import.meta.dev) {
  initialValues.step1.email = 'example21@gmail.com'
  initialValues.step1.password = 'a12345678'
  initialValues.step1.confirmPassword = 'a12345678'
  initialValues.step2.name = '王小明'
  initialValues.step2.phone = '0912345678'
  initialValues.step2.birthday = '1990/1/1'
  initialValues.step2.address.city = '高雄市'
  initialValues.step2.address.county = '前金區'
  initialValues.step2.address.detail = '信義路 123 號'
}

async function onStep1FormSubmit() {
  isEmailAndPasswordValid.value = true
}

async function onStep2FormSubmit(values: any) {
  const signupValues = {
    ...values,
    address: {
      ...values.address,
      zipcode: 800,
    },
    ...pick(step1FormRef.value?.values, ['email', 'password']),
  }

  const response = await signup(signupValues)
  if (!response?.status) {
    error(response?.message ?? '登入失敗')
    return
  }

  const token = useCookie(CookieEnum.Auth, {
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  token.value = response.token
  setUser(response.result)
  await success('登入成功')
  router.push('/')
}

function getBirthdayWithYear(event: Event, birthday?: string) {
  const [_, month, day] = birthday?.split('/') ?? ['', '', '']
  const target = event.target as HTMLSelectElement | null
  const year = target?.value
  return `${year}/${month}/${day}`
}

function getBirthdayWithMonth(event: Event, birthday?: string) {
  const [year, _, day] = birthday?.split('/') ?? ['', '', '']
  const target = event.target as HTMLSelectElement | null
  const month = target?.value
  return `${year}/${month}/${day}`
}

function getBirthdayWithDay(event: Event, birthday?: string) {
  const [year, month, _] = birthday?.split('/') ?? ['', '', '']
  const target = event.target as HTMLSelectElement | null
  const day = target?.value
  return `${year}/${month}/${day}`
}
</script>

<template>
  <div class="p-5 px-md-0 py-md-30">
    <div class="mb-10">
      <p class="mb-2 text-primary-100 fs-8 fs-md-7 fw-bold">
        享樂酒店，誠摯歡迎
      </p>
      <h1 class="mb-4 text-neutral-0 fw-bold">
        立即註冊
      </h1>

      <div class="d-flex align-items-center py-4 gap-2">
        <div class="d-flex flex-column align-items-center gap-1 text-neutral-0">
          <span
            :class="{ 'd-none': isEmailAndPasswordValid }"
            class="step p-2 bg-primary-100 rounded-circle"
          >1</span>
          <Icon
            :class="{ 'd-none': !isEmailAndPasswordValid }"
            class="p-2 fs-3 bg-primary-100 rounded-circle" icon="material-symbols:check"
          />
          <p class="mb-0 fs-8 fs-md-7 fw-bold">
            輸入信箱及密碼
          </p>
        </div>

        <hr class="flex-grow-1 my-0 border border-neutral-60 opacity-100">

        <div
          :class="{
            'text-neutral-0': isEmailAndPasswordValid, 'text-neutral-60': !isEmailAndPasswordValid,
          }" class="d-flex flex-column align-items-center gap-1"
        >
          <span
            :class="{
              'bg-primary-100': isEmailAndPasswordValid, 'bg-transparent border border-neutral-60': !isEmailAndPasswordValid,
            }" class="step p-2 rounded-circle"
          >2</span>
          <p class="mb-0 fs-8 fs-md-7 fw-bold">
            填寫基本資料
          </p>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <VForm
        v-slot="{ errors }" ref="step1Form" :class="{ 'd-none': isEmailAndPasswordValid }"
        class="mb-4" :initial-values="initialValues.step1" @submit="onStep1FormSubmit"
      >
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="email">
            電子信箱
          </label>
          <VField
            id="email" class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
            placeholder="請輸入 email" type="email" name="email" rules="required|email"
            :class="{ 'is-invalid': errors.email }" label="電子信箱"
          />
          <VErrorMessage name="email" class="invalid-feedback" />
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="password">
            密碼
          </label>
          <VField
            id="password"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
            placeholder="請輸入密碼" type="password" name="password" rules="required|password"
            :class="{ 'is-invalid': errors.password }" label="密碼"
          />
          <VErrorMessage name="password" class="invalid-feedback" />
        </div>
        <div class="mb-10 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="confirmPassword">
            確認密碼
          </label>
          <VField
            id="confirmPassword"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
            placeholder="請再輸入一次密碼" type="password" name="confirmPassword"
            rules="required|confirmed:@password" :class="{ 'is-invalid': errors.confirmPassword }"
            label="確認密碼"
          />
          <VErrorMessage name="confirmPassword" class="invalid-feedback" />
        </div>
        <button class="btn btn-primary-100 w-100 py-4 text-neutral-0 fw-bold" type="submit">
          下一步
        </button>
      </VForm>
      <VForm
        v-slot="{ errors, values }" :class="{ 'd-none': !isEmailAndPasswordValid }"
        class="mb-4" :initial-values="initialValues.step2" @submit="onStep2FormSubmit"
      >
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="name">
            姓名
          </label>
          <VField
            id="name"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40  rounded-3"
            placeholder="請輸入姓名" name="name" rules="required" :class="{ 'is-invalid': errors.name }"
            label="姓名"
          />
          <VErrorMessage name="name" class="invalid-feedback" />
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="phone">
            手機號碼
          </label>
          <VField
            id="phone"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40  rounded-3"
            placeholder="請輸入手機號碼" type="tel" name="phone" rules="required|phone_number"
            :class="{ 'is-invalid': errors.phone }" label="手機號碼"
          />
          <VErrorMessage name="phone" class="invalid-feedback" />
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="birth">
            生日
          </label>
          <VField
            v-slot="{ setValue, value }" as="div" :class="{ 'is-invalid': errors.birthday }"
            rules="date" name="birthday" class="d-flex gap-2"
          >
            <select
              id="birth" :class="{ 'is-invalid': errors.birthday }"
              :value="value?.split('/')?.[0]"
              class="form-select p-4 text-neutral-80 fw-medium rounded-3"
              @change.stop="setValue(getBirthdayWithYear($event, values.birthday))" @input.stop
            >
              <option value="" />
              <option v-for="year in 65" :key="year" :value="`${year + 1958}`">
                {{ year + 1958 }} 年
              </option>
            </select>
            <select
              :class="{ 'is-invalid': errors.birthday }" :value="value?.split('/')?.[1]"
              class="form-select p-4 text-neutral-80 fw-medium rounded-3"
              @change.stop="setValue(getBirthdayWithMonth($event, values.birthday))" @input.stop
            >
              <option value="" />
              <option v-for="month in 12" :key="month" :value="`${month}`">
                {{ month }} 月
              </option>
            </select>
            <select
              :class="{ 'is-invalid': errors.birthday }" :value="value?.split('/')?.[2]"
              class="form-select p-4 text-neutral-80 fw-medium rounded-3"
              @change.stop="setValue(getBirthdayWithDay($event, values.birthday))" @input.stop
            >
              <option value="" />
              <option v-for="day in 30" :key="day" :value="`${day}`">
                {{ day }} 日
              </option>
            </select>
          </VField>
          <VErrorMessage name="birthday" class="invalid-feedback" />
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="form-label text-neutral-0 fw-bold" for="address">
            地址
          </label>
          <div>
            <div class="d-flex gap-2 mb-2">
              <div class="flex-grow-1">
                <VField
                  as="select" name="address.city"
                  :class="{ 'is-invalid': errors['address.city'] }"
                  class="form-select p-4 text-neutral-80 fw-medium rounded-3" rules="required"
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
                <VErrorMessage name="address.city" class="invalid-feedback" />
              </div>
              <div class="flex-grow-1">
                <VField
                  as="select" name="address.county"
                  :class="{ 'is-invalid': errors['address.county'] }"
                  class="form-select p-4 text-neutral-80 fw-medium rounded-3" rules="required"
                  label="鄉鎮市區"
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
                  <option value="option">
                    新興區
                  </option>
                </VField>
                <VErrorMessage name="address.county" class="invalid-feedback" />
              </div>
            </div>
            <VErrorMessage name="address.zipcode" class="invalid-feedback" />
            <VField
              id="address" name="address.detail" type="text"
              class="form-control p-4 rounded-3" placeholder="請輸入詳細地址" rules="required"
              :class="{ 'is-invalid': errors['address.detail'] }" label="詳細地址"
            />
            <VErrorMessage name="address.detail" class="invalid-feedback" />
          </div>
        </div>

        <div class="form-check d-flex align-items-end gap-2 mb-10 text-neutral-0">
          <input id="agreementCheck" v-model="isAgree" class="form-check-input" type="checkbox">
          <label class="form-check-label fw-bold" for="agreementCheck">
            我已閱讀並同意本網站個資使用規範
          </label>
        </div>
        <button
          class="btn btn-primary-100 w-100 py-4 text-neutral-0 fw-bold" type="submit"
          :disabled="!isAgree"
        >
          完成註冊
        </button>
      </VForm>
    </div>

    <p class="mb-0 fs-8 fs-md-7">
      <span class="me-2 text-neutral-0 fw-medium">已經有會員了嗎？</span>
      <NuxtLink
        to="login"
        class="text-primary-100 fw-bold text-decoration-underline bg-transparent border-0"
      >
        <span>立即登入</span>
      </NuxtLink>
    </p>
  </div>
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

input[type='password'] {
  font: small-caption;
  font-size: 1.5rem;
}

input::placeholder {
  font-size: 1rem;
  font-weight: 500;
  color: #909090;

  @include media-breakpoint-down(md) {
    font-size: 14px;
  }
}

.form-check-input {
  width: 1.5rem;
  height: 1.5rem;
}

.form-check-input:checked {
  background-color: #bf9d7d;
  border-color: #bf9d7d;
}

.step {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}
</style>
