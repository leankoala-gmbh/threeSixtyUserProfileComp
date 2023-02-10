import { typesafeI18n } from '@/i18n/i18n-vue'

export const translator = () => {
  const { LL } = typesafeI18n()
  return LL.value
}
export const getTranslatorLocale = () => {
  const { locale } = typesafeI18n()
  return locale
}
