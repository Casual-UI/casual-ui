import type { Locale } from '@casual-ui/i18n'
import allMessages from '@casual-ui/i18n'
import { useMemo, useState } from 'react'

const useI18n = () => {
  const [locale, setLocale] = useState<Locale>('en')
  const messages = useMemo(() => allMessages[locale], [locale])

  return {
    locale,
    setLocale,
    messages,
  }
}

export default useI18n
