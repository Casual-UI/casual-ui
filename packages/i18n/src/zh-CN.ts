import type { LocaleItem, PageInfo } from './types'

export const weeks = ['日', '一', '二', '三', '四', '五', '六']

export const pagination: PageInfo = {
  prev: '前一页',
  next: '后一页',
  totalRows: '总条数',
  sizes: '每页条数',
  current: '第',
  page: '页',
}

const zhCN: LocaleItem = {
  weeks,
  pagination,
}

export default zhCN
