import locales from '@/locales/loader'
import { ref } from 'vue'

interface ILocales {
  [key: string]: {
    [key: string]: string
  }
}

const currentLanguage = ref<string>('en')

export function translator (key: string) : string {
  const translations: ILocales = locales()
  const languageSpectrum = Object.keys(translations)
  if (languageSpectrum.includes(currentLanguage.value)) {
    return translations[currentLanguage.value][key] || key
  }
  return key
}

export function setLanguage (lang: string) {
  currentLanguage.value = lang
}

export function getLanguage (): string {
  return currentLanguage.value
}
