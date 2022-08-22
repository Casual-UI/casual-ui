import type { LocaleItem, PageInfo } from './types'
const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const pagination: PageInfo = {
  prev: 'Prev',
  next: 'Next',
  totalRows: 'Total',
  sizes: 'Sizes',
  current: 'No',
  page: 'Page',
}

const en: LocaleItem = {
  weeks,
  pagination,
}

export default en
