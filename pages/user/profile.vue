<script setup lang="ts">
import type { UserResponse } from '~/api/schemas/user'
import { useUserApi } from '~/api/services/user'

definePageMeta({
  name: 'user-profile',
})

const props = defineProps<{
  user: UserResponse['result']
}>()

const { updateUser } = useUserApi()

const passwordFormRef = useTemplateRef('passwordForm')
const basicDataFormRef = useTemplateRef('basicDataForm')
const { error, success } = useAlert()
const isEditPassword = ref(false)
const isEditProfile = ref(false)

async function onPasswordFormSubmit(values: {
  userId?: string
  oldPassword?: string
  newPassword?: string
}) {
  const response = await updateUser({
    oldPassword: values.oldPassword,
    newPassword: values.newPassword,
    userId: values.userId,
  })

  if (!response?.status) {
    error(response?.message || '更新失敗')
    return
  }
  success('更新成功')
  isEditPassword.value = false
}

async function onBasicDataFormSubmit(values: {
  userId?: string
  name?: string
  phone?: string
  birthday?: string
  address?: {
    city?: string
    county?: string
    detail?: string
  }
}) {
  const response = await updateUser({
    ...values,
    address: {
      ...values.address,
      zipcode: 800,
    },
  })

  if (!response?.status) {
    error(response?.message || '更新失敗')
    return
  }
  success('更新成功')
  isEditProfile.value = false
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

onMounted(() => {
  passwordFormRef.value?.resetForm({
    values: {
      userId: props.user._id,
      email: props.user.email,
    },
  })

  if (import.meta.dev) {
    passwordFormRef.value?.setFieldValue('oldPassword', 'a12345678')
    passwordFormRef.value?.setFieldValue('newPassword', 'a12345678')
    passwordFormRef.value?.setFieldValue('confirmPassword', 'a12345678')
  }

  basicDataFormRef.value?.resetForm({
    values: {
      userId: props.user._id,
      name: props.user.name,
      phone: props.user.phone,
      birthday: formatDate(props.user.birthday, 'YYYY/M/D'),
      address: {
        city: props.user.address.city ?? '',
        county: props.user.address.county ?? '',
        detail: props.user.address.detail ?? '',
        zipcode: props.user.address.zipcode ?? null,
      },
    },
  })
})
</script>

<template>
  <div class="row gap-6 gap-md-0">
    <div class="col-12 col-md-5">
      <VForm
        v-slot="{ values, errors }" ref="passwordForm"
        class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-6 p-md-10 bg-neutral-0"
        @submit="onPasswordFormSubmit"
      >
        <h2 class="fs-6 fs-md-5 fw-bold">
          修改密碼
        </h2>
        <div class="d-flex flex-column gap-4 gap-md-6">
          <div class="fs-8 fs-md-7">
            <p class="mb-2 text-neutral-80 fw-medium">
              電子信箱
            </p>
            <span class="form-control pe-none p-0 text-neutral-100 fw-bold border-0">{{ values.email
            }}</span>
          </div>

          <div
            class="d-flex justify-content-between align-items-center"
            :class="{ 'd-none': isEditPassword }"
          >
            <div>
              <label class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
                密碼
              </label>
              <input
                class="form-control pe-none p-0 text-neutral-100 fs-5 fs-md-3 fw-bold border-0"
                type="password" value="**********"
              >
            </div>

            <button
              class="flex-shrink-0 text-primary-100 fs-8 fs-md-7 fw-bold text-decoration-underline border-0 bg-transparent"
              type="button" @click="isEditPassword = !isEditPassword"
            >
              重設
            </button>
          </div>

          <div class="d-flex flex-column gap-4 gap-md-6" :class="{ 'd-none': !isEditPassword }">
            <div>
              <label for="oldPassword" class="form-label fs-8 fs-md-7 fw-bold">舊密碼</label>
              <VField
                id="oldPassword" type="password" class="form-control p-4 fs-7 rounded-3"
                placeholder="請輸入舊密碼" name="oldPassword"
                :class="{ 'is-invalid': errors.oldPassword }" rules="required" label="舊密碼"
              />
              <VErrorMessage name="oldPassword" class="invalid-feedback" />
            </div>

            <div>
              <label for="newPassword" class="form-label fs-8 fs-md-7 fw-bold">新密碼</label>
              <VField
                id="newPassword" type="password" class="form-control p-4 fs-7 rounded-3"
                placeholder="請輸入新密碼" name="newPassword"
                :class="{ 'is-invalid': errors.newPassword }" rules="required|password"
                label="新密碼"
              />
              <VErrorMessage name="newPassword" class="invalid-feedback" />
            </div>

            <div>
              <label for="confirmPassword" class="form-label fs-8 fs-md-7 fw-bold">確認新密碼</label>
              <VField
                id="confirmPassword" type="password" class="form-control p-4 fs-7 rounded-3"
                placeholder="請再輸入一次新密碼" name="confirmPassword"
                :class="{ 'is-invalid': errors.confirmPassword }"
                rules="required|confirmed:@newPassword" label="確認新密碼"
              />
              <VErrorMessage name="confirmPassword" class="invalid-feedback" />
            </div>
          </div>

          <button
            :class="{ 'd-none': !isEditPassword }"
            class="btn btn-neutral-40 align-self-md-start px-8 py-4 text-neutral-60 rounded-3"
            type="submit"
          >
            儲存設定
          </button>
        </div>
      </VForm>
    </div>

    <div class="col-12 col-md-7">
      <VForm
        ref="basicDataForm" v-slot="{ values, errors }"
        class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-6 p-md-10 bg-neutral-0"
        @submit="onBasicDataFormSubmit"
      >
        <h2 class="fs-6 fs-md-5 fw-bold">
          基本資料
        </h2>
        <div class="d-flex flex-column gap-4 gap-md-6">
          <div class="fs-8 fs-md-7">
            <label
              class="form-label"
              :class="{ 'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile }"
              for="name"
            >
              姓名
            </label>
            <VField
              id="name" name="name" class="form-control text-neutral-100 fw-bold"
              :class="{ 'pe-none p-0 border-0': !isEditProfile, 'p-4': isEditProfile, 'is-invalid': errors.name }"
              type="text" rules="required" label="姓名"
            />
            <VErrorMessage name="name" class="invalid-feedback" />
          </div>

          <div class="fs-8 fs-md-7">
            <label
              class="form-label"
              :class="{ 'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile }"
              for="phone"
            >
              手機號碼
            </label>
            <VField
              id="phone" name="phone" class="form-control text-neutral-100 fw-bold"
              :class="{ 'pe-none p-0 border-0': !isEditProfile, 'p-4': isEditProfile, 'is-invalid': errors.phone }"
              type="tel" rules="required" label="手機號碼"
            />
            <VErrorMessage name="phone" class="invalid-feedback" />
          </div>

          <div class="fs-8 fs-md-7">
            <label
              class="form-label"
              :class="{ 'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile }"
              for="birth"
            >
              生日
            </label>
            <span
              class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
              :class="{ 'd-none': isEditProfile }"
            >
              {{ formatDate(values.birthday, 'YYYY 年 M 月 D 日') }}
            </span>
            <VField
              v-slot="{ setValue, value }" as="div" class="d-flex gap-2"
              :class="{ 'd-none': !isEditProfile, 'is-invalid': errors.birthday }" name="birthday"
              rules="date" label="生日"
            >
              <select
                id="birth" class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                :value="value?.split('/')?.[0]"
                @change.stop="setValue(getBirthdayWithYear($event, values.birthday))" @input.stop
              >
                <option value="" />
                <option v-for="year in 65" :key="year" :value="`${year + 1958}`">
                  {{ year + 1958 }} 年
                </option>
              </select>
              <select
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                :value="value?.split('/')?.[1]"
                @change.stop="setValue(getBirthdayWithMonth($event, values.birthday))" @input.stop
              >
                <option value="" />
                <option v-for="month in 12" :key="month" :value="`${month}`">
                  {{ month }} 月
                </option>
              </select>
              <select
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                :value="value?.split('/')?.[2]"
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

          <div class="fs-8 fs-md-7">
            <label
              class="form-label"
              :class="{ 'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile }"
              for="address"
            >
              地址
            </label>
            <span
              class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
              :class="{ 'd-none': isEditProfile }"
            >{{
              `${values.address?.city}${values.address?.county}${values.address?.detail}` }}</span>
            <div :class="{ 'd-none': !isEditProfile }">
              <div class="d-flex gap-2 mb-2">
                <div class="flex-grow-1">
                  <VField
                    as="select" name="address.city"
                    class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                    :class="{ 'is-invalid': errors['address.city'] }"
                    rules="required"
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
                    class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                    :class="{ 'is-invalid': errors['address.county'] }"
                    rules="required"
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
                    <option value="新興區">
                      新興區
                    </option>
                  </VField>
                  <VErrorMessage name="address.county" class="invalid-feedback" />
                </div>
              </div>
              <VField
                id="address" name="address.detail" type="text"
                class="form-control p-4 rounded-3" placeholder="請輸入詳細地址"
                :class="{ 'is-invalid': errors['address.detail'] }"
                rules="required"
                label="詳細地址"
              />
              <VErrorMessage name="address.detail" class="invalid-feedback" />
            </div>
          </div>
        </div>
        <button
          :class="{ 'd-none': isEditProfile }"
          class="btn btn-outline-primary-100 align-self-start px-8 py-4 rounded-3" type="button"
          @click="isEditProfile = !isEditProfile"
        >
          編輯
        </button>

        <button
          :class="{ 'd-none': !isEditProfile }"
          class="btn btn-neutral-40 align-self-md-start px-8 py-4 text-neutral-60 rounded-3"
          type="submit"
        >
          儲存設定
        </button>
      </VForm>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rounded-3xl {
  border-radius: 1.25rem;
}

input[type='password'] {
  font: small-caption;
}

.form-control::placeholder {
  --neutral-60: #909090;

  font-weight: 500;
  color: var(--neutral-60);
}
</style>
