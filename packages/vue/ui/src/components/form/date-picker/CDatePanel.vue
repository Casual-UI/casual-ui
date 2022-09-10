<script setup lang="ts">
import { toRefs, computed, ref } from 'vue'
import dayjs from 'dayjs'
import { useMessage } from '../../../usable/useI18n'

type Formatter = (origin: Date | null, format: string) => string

interface ODatePanelProps {
  year?: number
  month?: number
  modelValue?: Date | null
  dateRange?: [Date | null, Date | null]
  formattedDateRange?: [string, string]
  format?: string
  formatter?: Formatter
  range?: boolean
}

const messages = useMessage()

/**
 * 比较两个日期是否相等
 */
const isSameDate = (d1: Date | null, d2: Date | null) => {
  return innerFormatter(d1) === innerFormatter(d2)
}

const props = withDefaults(defineProps<ODatePanelProps>(), {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  modelValue: () => new Date(),
  dateRange: () => [null, null],
  formattedDateRange: () => ['', ''],
  format: 'YYYY-MM-DD',
  formatter: (d: Date | null, f: string) => {
    if (!d) return ''
    return dayjs(d).format(f)
  },
  range: false,
})
const innerFormatter = (d: Date | null) => props.formatter(d, props.format)

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: Date | null): void
  (e: 'update:dateRange', dateRange: [Date | null, Date | null]): void
}>()

const { month, year, modelValue, dateRange, formattedDateRange } = toRefs(props)

// 获取当前年月对应的日期
const getCurrentYearMonthDate = () => {
  const d = new Date()
  d.setDate(1)
  d.setFullYear(year.value)
  d.setMonth(month.value)
  return d
}

// 设置日期
const setDate = (date: number) => {
  const d = getCurrentYearMonthDate()
  d.setDate(date)
  const target = innerFormatter(d)
  // 单选时
  if (!props.range) {
    emit('update:modelValue', d)
    return
  }
  // 多选时
  const [start, end] = dateRange.value
  const [fStart] = formattedDateRange.value
  if (!start) {
    emit('update:dateRange', [d, end])
    return
  }
  if (!end) {
    emit('update:dateRange', fStart < target ? [start, d] : [d, start])
    return
  }
  emit('update:dateRange', [d, null])
}

const dates = computed(() => {
  const d = new Date()
  d.setFullYear(year.value)
  d.setMonth(month.value)
  d.setDate(1)
  const weekNum = d.getDay()
  // 左边补空位
  const leftPads = Array(weekNum % 7)
    .fill('')
    .map((_, i) => -i)
    .reverse()
  d.setMonth(month.value + 1)
  d.setDate(0)
  const middle = Array(d.getDate())
    .fill(0)
    .map((_, i) => i + 1)

  // 右边补空位
  const rightPads = Array(42 - leftPads.length - middle.length)
    .fill('')
    .map((_, i) => middle.length + i + 1)

  const items = [...leftPads, ...middle, ...rightPads]

  return {
    items,
    start: leftPads.length,
    end: leftPads.length + middle.length,
  }
})

// 鼠标上浮的结束日期
const hoveringDate = ref(dateRange.value[1])

const setHoveringDate = (date: number) => {
  const d = getCurrentYearMonthDate()
  d.setDate(date)
  hoveringDate.value = d
}

// 日期段选择时，判断目标日期是否在所选择时间段内
const isDateInRange = (date: number) => {
  const [startDate, endDate] = formattedDateRange.value
  if (!startDate) return false
  if (!endDate && !hoveringDate.value) return false
  const d = getCurrentYearMonthDate()
  d.setDate(date)
  const hovering = innerFormatter(hoveringDate.value)
  const target = innerFormatter(d)
  if (endDate) {
    return target >= startDate && target <= endDate
  }
  return (
    (target >= startDate && target <= hovering) ||
    (target >= hovering && target <= startDate)
  )
}

// 日期段选择时，判断目标日期是否为开始日期
const isStart = (date: number) => {
  const d = getCurrentYearMonthDate()
  d.setDate(date)
  const [start, end] = formattedDateRange.value
  const hovering = innerFormatter(hoveringDate.value)
  const target = innerFormatter(d)
  if (!end) {
    return hovering <= start ? target === hovering : target === start
  }
  return start === target
}

// 日期段选择时，判断目标日期是否为结束日期
const isEnd = (date: number) => {
  const d = getCurrentYearMonthDate()
  d.setDate(date)
  const [start, end] = formattedDateRange.value
  const hovering = innerFormatter(hoveringDate.value)
  const target = innerFormatter(d)
  if (!end) {
    return hovering < start ? target === start : target === hovering
  }
  return end === target
}

// 目标日期是否展示选中态样式
const isSelected = (date: number) => {
  const checkTarget = new Date(year.value, month.value, date)
  if (props.range) {
    return dateRange.value.some(d => isSameDate(d, checkTarget))
  }
  return isSameDate(modelValue.value, checkTarget)
}

// 获取单元格应当展示的日期数字
const getDisplayDateNum = (date: number) => {
  const d = getCurrentYearMonthDate()
  d.setDate(date)
  return d.getDate()
}
</script>
<template>
  <div :class="['c-date-panel', 'c-date-picker--panel']">
    <div class="c-date-panel--body">
      <div
        v-for="w in messages.weeks"
        :key="w"
        class="c-date-panel--week-item"
      >
        {{ w }}
      </div>
      <div
        v-for="(d, i) in dates.items"
        :key="i"
        class="c-date-panel--date-item"
        :class="[
          {
            'c-date-panel--date-item--is-start': isStart(d),
          },
          {
            'c-date-panel--date-item--is-end': isEnd(d),
          },
          {
            'c-date-panel--date-item--in-range': isDateInRange(d),
          },
        ]"
        @click.stop="setDate(d)"
        @mouseenter="setHoveringDate(d)"
      >
        <div
          :class="[
            'c-date-panel--date-item--inner',
            {
              'c-date-panel--date-item--inner-selected': isSelected(d),
            },
            {
              'c-date-panel--date-item--inner-not-current-month':
                i < dates.start || i >= dates.end,
            },
          ]"
        >
          {{ getDisplayDateNum(d) }}
        </div>
      </div>
    </div>
  </div>
</template>
