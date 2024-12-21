import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import { confirmed, email, min, required } from '@vee-validate/rules'
import { configure, defineRule } from 'vee-validate'

export default defineNuxtPlugin(() => {
  // 定義全域的規則
  defineRule('required', required)
  defineRule('min', min)
  defineRule('email', email)
  defineRule('confirmed', confirmed)

  // 自訂驗證規則
  defineRule('phone_number', (value: any) => {
    const regex = /^09\d{8}$/
    return (regex.test(value) || '需要正確的電話號碼')
  })

  defineRule('password', (value: any) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{8,}$/i
    return (regex.test(value) || '需要至少 8 位數的英文和數字組合')
  })

  defineRule('date', (value: any) => {
    const regex = /^\d{4}\/\d{1,2}\/\d{1,2}$/
    return (regex.test(value) || '需要填寫完整的日期格式')
  })

  // 設定多國語系與驗證訊息
  configure({
    // 載入繁體中文的設定檔，產生繁體中文的驗證訊息
    generateMessage: localize({ zh_TW: zhTW }),
  })

  // 設定預設語言為繁體中文
  setLocale('zh_TW')
})
