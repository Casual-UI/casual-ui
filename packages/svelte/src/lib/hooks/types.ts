import type { Locale, LocaleItem } from '@casual-ui/i18n'
import type { Writable } from 'svelte/store'

type WritableLocale = Writable<Locale>

type WritableMessage = Writable<LocaleItem>

export type { WritableLocale, WritableMessage }
