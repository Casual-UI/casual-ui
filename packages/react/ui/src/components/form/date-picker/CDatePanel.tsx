import React, { useMemo, useState } from 'react'
import clsx from 'clsx'
import type { DateValue, Formatter } from './CDatePicker'
import dayjs from 'dayjs'
import { weeks } from 'casual-i18n'

interface CDatePanelProps {
  year?: number
  month?: number
  value?: DateValue
  dateRange?: [DateValue, DateValue]
  formattedDateRange?: [string, string]
  format?: string
  formatter?: Formatter
  range?: boolean
  onChange?: (value: DateValue) => void
  onDateRangeChange?: (value: [DateValue, DateValue]) => void
}
const CDatePanel = ({
  onChange,
  onDateRangeChange,
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  value = new Date(),
  dateRange = [null, null],
  formattedDateRange = ['', ''],
  format = 'YYYY-MM-DD',
  formatter = (d, f) => {
    if (!d) return ''
    return dayjs(d).format(f)
  },
  range = false,
}: CDatePanelProps) => {
  const innerFormatter = (d: DateValue) => formatter(d, format)
  const isSameDate = (d1: Date | null, d2: Date | null) => {
    return innerFormatter(d1) === innerFormatter(d2)
  }
  // 获取当前年月对应的日期
  const getCurrentYearMonthDate = () => {
    const d = new Date()
    d.setFullYear(year)
    d.setMonth(month)
    return d
  }

  // 设置日期
  const setDate = (date: number) => {
    const d = getCurrentYearMonthDate()
    d.setDate(date)
    const target = innerFormatter(d)
    // 单选时
    if (!range) {
      onChange?.(d)
      return
    }
    // 多选时
    const [start, end] = dateRange
    const [fStart] = formattedDateRange
    if (!start) {
      onDateRangeChange?.([d, end])
      return
    }
    if (!end) {
      onDateRangeChange?.(fStart < target ? [start, d] : [d, start])
      return
    }
    onDateRangeChange?.([d, null])
  }

  const dates = useMemo(() => {
    const d = new Date()
    d.setFullYear(year)
    d.setMonth(month)
    d.setDate(1)
    const weekNum = d.getDay()
    // 左边补空位
    const leftPads = Array(weekNum % 7)
      .fill('')
      .map((_, i) => -i)
      .reverse()
    d.setMonth(month + 1)
    d.setDate(0)
    const middle = Array(d.getDate())
      .fill(0)
      .map((_, i) => i + 1)

    // 右边补空位
    const rightPads = Array(42 - leftPads.length - middle.length)
      .fill('')
      .map((_, i) => middle.length + i + 1)
    return [...leftPads, ...middle, ...rightPads]
  }, [month, year])

  const [hoveringDate, setHoveringDate] = useState(dateRange[1])

  const doSetHoveringDate = (date: number) => {
    const d = getCurrentYearMonthDate()
    d.setDate(date)
    setHoveringDate(d)
  }

  const isDateInRange = (date: number) => {
    const [startDate, endDate] = formattedDateRange
    if (!startDate) return false
    if (!endDate && !hoveringDate) return false
    const d = getCurrentYearMonthDate()
    d.setDate(date)
    const hovering = innerFormatter(hoveringDate)
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
    const [start, end] = formattedDateRange
    const hovering = innerFormatter(hoveringDate)
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
    const [start, end] = formattedDateRange
    const hovering = innerFormatter(hoveringDate)
    const target = innerFormatter(d)
    if (!end) {
      return hovering < start ? target === start : target === hovering
    }
    return end === target
  }

  // 目标日期是否展示选中态样式
  const isSelected = (date: number) => {
    const checkTarget = new Date(year, month, date)
    if (range) {
      return dateRange.some(d => isSameDate(d, checkTarget))
    }
    return isSameDate(value, checkTarget)
  }

  // 当前面板日期是否在当前面板所处月份中
  const isCurrentDateInCurrentMonth = (date: number) => {
    const d = getCurrentYearMonthDate()
    d.setDate(date)
    return d.getMonth() === month
  }

  // 获取单元格应当展示的日期数字
  const getDisplayDateNum = (date: number) => {
    const d = getCurrentYearMonthDate()
    d.setDate(date)
    return d.getDate()
  }

  return (
    <div className="c-date-panel c-date-picker--panel">
      <div className="c-date-panel--body">
        {weeks.map(week => (
          <div key={week} className="c-date-panel--week-item">
            {week}
          </div>
        ))}
        {dates.map((date, i) => (
          <div
            key={i}
            className={clsx(
              'c-date-panel--date-item',
              isStart(date) && 'c-date-panel--date-item--is-start',
              isEnd(date) && 'c-date-panel--date-item--is-end',
              isDateInRange(date) && 'c-date-panel--date-item--in-range'
            )}
            onClick={e => {
              e.stopPropagation()
              setDate(date)
            }}
            onMouseEnter={() => doSetHoveringDate(date)}
          >
            <div
              className={clsx(
                'c-date-panel--date-item--inner',
                isSelected(date) && 'c-date-panel--date-item--inner-selected',
                !isCurrentDateInCurrentMonth(date) &&
                  'c-date-panel--date-item--inner-not-current-month'
              )}
            >
              {getDisplayDateNum(date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default CDatePanel
export type { CDatePanelProps }
