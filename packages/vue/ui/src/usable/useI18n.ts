import type { Locale } from '@casual-ui/i18n'
import messages, { key } from '@casual-ui/i18n'
import { computed, inject, provide, ref } from 'vue'
import type { Ref } from 'vue'

/**
 * To set or get the current locale.
 * @zh 获取或者设置国际化语言
 */
const useI18n = (locale?: Locale): Ref<Locale> => {
  if (locale) {
    const context = ref(locale)
    provide(key, context)
    return context
  }
  let context = inject<Ref<Locale>>(key)
  if (!context) {
    context = ref<Locale>('en')
    provide(key, context)
  }
  return context
}

/**
 * Get the messages for current locale.
 * @zh 获取当前国际化语言所对应的信息
 */
const useMessage = () => {
  const locale = useI18n()
  const messagesWithLocale = computed(() => messages[locale.value])
  return messagesWithLocale
}

export default useI18n

export { useMessage }
