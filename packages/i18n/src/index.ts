import en from './en'
import type { LocaleItem } from './types'
import zhCN from './zh-CN'

type Locale = 'zhCN' | 'en'

type Messages = {
  [k in Locale]: LocaleItem
}

const key = Symbol('casual-i18n')

const messages = {
  zhCN,
  en,
}

export { key }

export default messages

export type { Locale, Messages, LocaleItem }
