import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import avueZhLocale from '@smallwei/avue/lib/locale/lang/zh' // avue lang
import avueEnLocale from '@smallwei/avue/lib/locale/lang/en' // avue lang
import enLocale from './en' // local lang
import zhLocale from './zh' // local lang
import { APP_SETTING } from '@/config/setting'
Vue.use(VueI18n)

elementEnLocale.el.datepicker.startDate = 'Start date'
elementEnLocale.el.datepicker.startTime = 'Start time'
elementEnLocale.el.datepicker.endDate = 'End date'
elementEnLocale.el.datepicker.endTime = 'End time'
avueEnLocale.date.start = 'Start date'
avueEnLocale.date.end = 'End date'
avueEnLocale.crud.menu = 'Opreate'

// 语言包
const messages = {
  en: {
    ...enLocale,
    ...avueEnLocale,
    ...elementEnLocale,
  },
  zh: {
    ...zhLocale,
    ...avueZhLocale,
    ...elementZhLocale,
  },
}

// 获取当前设置的语言
export function getLanguage() {
  const { setting } = JSON.parse(localStorage.getItem(APP_SETTING.storeKey)) ?? {}
  const chooseLanguage = APP_SETTING.openLanguage && setting?.language ? setting.language : 'zh'
  if (chooseLanguage) return chooseLanguage
  return 'zh'
}

// 实例化VueI18n
const i18n = new VueI18n({
  locale: getLanguage(), // options: en | zh | es
  silentTranslationWarn: !APP_SETTING.openLanguage,
  messages,
})

export default i18n
