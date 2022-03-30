import React, { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { CSize } from 'casual-types'
import dayjs from 'dayjs'
import { useSize, CSizeContext } from 'casual-ui-react'
import CDropdown from '../../interact/CDropdown'
import CInput from '../CInput'

type DateValue = Date | null
type Unit = 'day' | 'month' | 'year'
interface ODatePickerProps {
  /**
   * 单选时选中的日期值
   */
  value?: DateValue
  /**
   * 单选时选中日期变化时触发事件
   */
  onChange?: (value: DateValue) => void
  /**
   * 单选时选中日期格式化后的值
   */
  formattedValue?: string
  /**
   * 单选时选中日期格式化后的值变化时触发事件
   */
  onFormattedValueChange?: (formattedValue: string) => void
  /**
   * 日期段选择时选中的日期范围值
   */
  rangeValue?: [DateValue, DateValue]
  /**
   * 日期段选择时，选中的日期段格式化后的值
   */
  formattedRangeValue?: [string, string]
  /**
   * 日期段选择时，选中日期段变化时触发事件
   */
  onRangeChange?: (value: [DateValue, DateValue]) => void
  /**
   * 日期段选择时，选中日期段格式化后的值变化时触发事件，<a href="https://day.js.org/docs/en/display/format#list-of-all-available-formats" target="_blank">Dayjs</a>
   */
  onFormattedRangeChange?: (formattedValue: [string, string]) => void
  /**
   * 格式化模板字符串，详情参考
   */
  format?: string
  /**
   * 自定义格式化函数
   */
  formatter?: (value: DateValue, format: string) => string
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 是否在完成选择时自动收起下拉
   */
  hideOnSelect?: boolean
  /**
   * 预设文本
   */
  placeholder?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 选择单位
   */
  unit?: Unit
  /**
   * 选择单位变化时触发
   */
  onUnitChange?: (unit: Unit) => void
  /**
   * 是否为日期段选择
   */
  range?: boolean
}

const ODatePicker = ({
  value = null,
  onChange,
  formattedValue,
  onFormattedValueChange,
  rangeValue = [null, null],
  onRangeChange,
  formattedRangeValue,
  onFormattedRangeChange,
  format = '',
  size,
  formatter = (v, f) => {
    if (v) {
      return ''
    }
    return dayjs(v).format(f)
  },
  range = false,
  unit = 'day',
  onUnitChange,
  hideOnSelect = true,
  disabled = false,
}: ODatePickerProps) => {
  const now = new Date()

  const innerFormatter = (d: DateValue) => formatter(d, format)

  useEffect(() => {
    onFormattedValueChange?.(innerFormatter(value))
  }, [value])

  useEffect(() => {
    const [start, end] = rangeValue
    onFormattedRangeChange?.([innerFormatter(start), innerFormatter(end)])
  }, [rangeValue])

  const displayValue = useMemo(() => {
    if (range) {
      const [start, end] = rangeValue
      if (!start && !end) return ''
      return `${start} - ${end}`
    }
    return formattedValue || ''
  }, [range, formattedValue, formattedRangeValue])
  const [showDrop, setShowDrop] = useState(false)
  const [year, setYear] = useState(value?.getFullYear() || now.getFullYear())
  const [month, setMonth] = useState(value?.getMonth() || now.getMonth())
  const [yearRange, setYearRange] = useState([year, year + 11])
  const initialUnit = unit
  const onDateSet = () => {
    if (hideOnSelect) {
      setShowDrop(false)
    }
  }
  const onUpdateUnit = (newUnit: Unit) => {
    if (newUnit === 'day') {
      // 反向
    } else if (newUnit === 'year') {
      // 正向
    } else {
      if (unit === 'day') {
        // day to month 正向
      } else {
        // year to month 反向
      }
    }
    onUnitChange?.(newUnit)
  }

  const onMonthSet = (newDate: DateValue) => {
    setMonth(newDate?.getMonth() || 0)
    if (initialUnit === 'day') {
      onUpdateUnit('day')
      return
    }
    onDateSet()
  }

  const onYearSet = (newDate: DateValue) => {
    setYear(newDate?.getFullYear() || 0)
    if (initialUnit === 'year') {
      onDateSet()
      return
    }
    onUpdateUnit('month')
  }

  const contextSize = useSize()

  return (
    <CSizeContext.Provider value={contextSize}>
      <div
        className={clsx(
          'c-date-picker',
          `c-date-picker--size-${contextSize}`,
          `c-font-${contextSize}`,
          disabled && 'c-date-picker--disabled'
        )}
      >
        <CDropdown
          value={showDrop}
          onChange={setShowDrop}
          disabled={disabled}
          dropContent={<div>{/* TODO: 实现剩余部分 */}</div>}
        >
          <CInput value={displayValue} readonly />
        </CDropdown>
      </div>
    </CSizeContext.Provider>
  )
}
export default ODatePicker
export type { ODatePickerProps }
