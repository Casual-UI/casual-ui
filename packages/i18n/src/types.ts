interface PageInfo {
  prev: string
  next: string
  current: string
  totalRows: string
  sizes: string
  page: string
}

interface LocaleItem {
  pagination: PageInfo
  weeks: string[]
}

export type { PageInfo, LocaleItem }
