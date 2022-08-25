import { getContext, hasContext, setContext } from 'svelte'
import { get, writable } from 'svelte/store'
import allMessages from '@casual-ui/i18n'

const key = Symbol('causal-ui-i18n')

/**
 * @type {import('./types').WritableLocale}
 */
const locale = writable('en')

const messages = writable(allMessages[get(locale)])

locale.subscribe(newLocale => {
  messages.set(allMessages[newLocale])
})

/**
 * @param {import('@casual-ui/i18n').Locale} newLocale
 */
const setLocale = newLocale => {
  locale.set(newLocale)
}

const useI18n = () => {
  if (!hasContext(key)) {
    setContext(key, locale)
  }

  return {
    locale,
    messages,
    setLocale,
  }
}

export default useI18n
