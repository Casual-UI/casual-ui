import React, { useMemo } from 'react'
import clsx from 'clsx'
import {
  matKeyboardArrowLeft,
  matKeyboardDoubleArrowLeft,
  matKeyboardArrowRight,
  matKeyboardDoubleArrowRight,
} from '@quasar/extras/material-icons'
import { CSize } from 'casual-types'
import type { Unit } from './CDatePicker'
import { useSize, CIcon } from 'casual-ui-react'

interface CDatePanelHeaderProps {
  year?: number
  month?: number
  size?: CSize
  unit?: Unit
  yearRange?: [number, number]
  unitSwitchable?: boolean
  onYearRangeChange?: (yearRange: [number, number]) => void
  onYearChange?: (year: number) => void
  onMonthChange?: (month: number) => void
  onUnitChange?: (unit: Unit) => void
}
const CDatePanelHeader = ({
  size,
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  unit = 'day',
  yearRange = [new Date().getFullYear(), new Date().getFullYear() + 11],
  unitSwitchable = false,
  onYearChange,
  onMonthChange,
  onYearRangeChange,
  onUnitChange,
}: CDatePanelHeaderProps) => {
  // 获取当前年月对应的日期
  const getCurrentYearMonthDate = () => {
    const d = new Date()
    d.setDate(1)
    d.setFullYear(year)
    d.setMonth(month)
    return d
  }
  // 根据指定日期重新设置当前年月
  const resetYearMonth = (d: Date) => {
    onYearChange?.(d.getFullYear())
    onMonthChange?.(d.getMonth())
  }

  const toPrevMonth = () => {
    const d = getCurrentYearMonthDate()
    d.setMonth(d.getMonth() - 1)
    resetYearMonth(d)
  }

  const toNextMonth = () => {
    const d = getCurrentYearMonthDate()
    d.setMonth(d.getMonth() + 1)
    resetYearMonth(d)
  }

  const toPrevYear = () => {
    const d = getCurrentYearMonthDate()
    d.setFullYear(d.getFullYear() - 1)
    resetYearMonth(d)
  }

  const toNextYear = () => {
    const d = getCurrentYearMonthDate()
    d.setFullYear(d.getFullYear() + 1)
    resetYearMonth(d)
  }

  const previousYearRange = () => {
    const [start, end] = yearRange
    onYearRangeChange?.([start - 12, end - 12])
  }

  const nextYearRange = () => {
    const [start, end] = yearRange
    onYearRangeChange?.([start + 12, end + 12])
  }

  const displayMonth = useMemo(() => {
    const d = new Date()
    d.setDate(1)
    d.setMonth(month)
    return d.toLocaleDateString('en-US', { month: 'short' })
  }, [month])

  const isDay = useMemo(() => unit === 'day', [unit])
  const isMonth = useMemo(() => unit === 'month', [unit])

  const setUnit = (newUnit: Unit) => {
    if (!unitSwitchable) return
    onUnitChange?.(newUnit)
  }

  const realSize = useSize(size)

  return (
    <div
      className={clsx(
        'c-date-panel--header',
        `c-px-${realSize}`,
        `c-pt-${realSize}`
      )}
    >
      <div className="c-flex c-items-center">
        {isDay || isMonth ? (
          <CIcon content={matKeyboardDoubleArrowLeft} onClick={toPrevYear} />
        ) : (
          <CIcon
            content={matKeyboardDoubleArrowLeft}
            onClick={previousYearRange}
          />
        )}
        {isDay && (
          <CIcon content={matKeyboardArrowLeft} onClick={toPrevMonth} />
        )}
      </div>
      <div
        className={clsx(
          'c-date-panel--year',
          (isDay || isMonth) &&
            unitSwitchable &&
            'c-date-panel--year-switchable'
        )}
      >
        {isDay && (
          <span
            onClick={e => {
              e.stopPropagation()
              setUnit('month')
            }}
          >
            {displayMonth}
          </span>
        )}
        &nbsp;
        {isDay || isMonth ? (
          <span
            onClick={e => {
              e.stopPropagation()
              setUnit('year')
            }}
          >
            {year}
          </span>
        ) : (
          <span>{yearRange.join(' - ')}</span>
        )}
      </div>
      <div className="c-flex c-items-center">
        {isDay && (
          <CIcon content={matKeyboardArrowRight} onClick={toNextMonth} />
        )}
        {isDay || isMonth ? (
          <CIcon content={matKeyboardDoubleArrowRight} onClick={toNextYear} />
        ) : (
          <CIcon
            content={matKeyboardDoubleArrowRight}
            onClick={nextYearRange}
          />
        )}
      </div>
    </div>
  )
}
export default CDatePanelHeader
export type { CDatePanelHeaderProps }
