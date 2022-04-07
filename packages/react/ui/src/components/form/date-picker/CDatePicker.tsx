import React, { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { CSize } from 'casual-types'
import dayjs from 'dayjs'
import { useSize, CSizeContext, CTabs } from 'casual-ui-react'
import CDropdown from '../../interact/CDropdown'
import CInput from '../CInput'
import CDatePanelHeader from './CDatePanelHeader'
import CDateGridPanel from './CDateGridPanel'
import CDatePanel from './CDatePanel'

type DateValue = Date | null
type Formatter = (origin: DateValue, format: string) => string
type Unit = 'day' | 'month' | 'year'

const getDisplayMonth = (month: number) => {
  const d = new Date()
  d.setMonth(month)
  return d.toLocaleDateString('en-US', { month: 'short' })
}

interface CDatePickerProps {
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
  formatter?: Formatter
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
   * 是否为日期段选择
   */
  range?: boolean
}

const CDatePicker = ({
  value = null,
  onChange,
  formattedValue,
  onFormattedValueChange,
  rangeValue = [null, null],
  onRangeChange,
  formattedRangeValue,
  onFormattedRangeChange,
  format = 'YYYY-MM-DD',
  size,
  formatter = (v, f) => {
    if (!v) {
      return ''
    }
    return dayjs(v).format(f)
  },
  range = false,
  unit = 'day',
  hideOnSelect = true,
  disabled = false,
  placeholder,
}: CDatePickerProps) => {
  const now = new Date()

  const innerFormatter = (d: DateValue) => formatter(d, format)

  useEffect(() => {
    if (!value) return
    onFormattedValueChange?.(innerFormatter(value))
  }, [value])

  useEffect(() => {
    const [start, end] = rangeValue
    onFormattedRangeChange?.([innerFormatter(start), innerFormatter(end)])
  }, [rangeValue])

  const displayValue = useMemo(() => {
    if (range) {
      const [start, end] = formattedRangeValue || ['', '']
      if (!start && !end) return ''
      return `${start} - ${end}`
    }
    return formattedValue || ''
  }, [range, formattedValue, formattedRangeValue])
  const [showDrop, setShowDrop] = useState(false)
  const [year, setYear] = useState(value?.getFullYear() || now.getFullYear())
  const [month, setMonth] = useState(value?.getMonth() || now.getMonth())
  const [yearRange, setYearRange] = useState<[number, number]>([
    year,
    year + 11,
  ])
  const [innerUnit, setInnerUnit] = useState(unit)
  const onDateSet = () => {
    if (hideOnSelect) {
      setShowDrop(false)
    }
  }
  const onMonthSet = (newMonth: number, setNextName) => {
    setMonth(newMonth)
    onChange?.(
      new Date(value?.getFullYear() || year, newMonth, value?.getDate() || 1)
    )
    if (unit === 'day') {
      setNextName('day')
      return
    }
    onDateSet()
  }

  const onYearSet = (newYear: number, setNextName) => {
    setYear(newYear)
    onChange?.(
      new Date(newYear, value?.getMonth() || month, value?.getDate() || 1)
    )
    if (unit === 'year') {
      onDateSet()
      return
    }
    setNextName('month')
  }

  const contextSize = useSize(size)

  const isYearActive = yearNum => yearNum === value?.getFullYear()

  const isMonthActive = (monthNum: number) => {
    const d = new Date()
    d.setFullYear(year)
    d.setMonth(monthNum)
    return (
      d.getFullYear() === value?.getFullYear() &&
      d.getMonth() === value?.getMonth()
    )
  }

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
          widthWithinParent={false}
          disabled={disabled}
          dropContent={
            <CTabs
              customHeader={setNextName => (
                <CDatePanelHeader
                  year={year}
                  month={month}
                  yearRange={yearRange}
                  unit={innerUnit}
                  onYearChange={setYear}
                  onMonthChange={setMonth}
                  onUnitChange={setNextName}
                  onYearRangeChange={setYearRange}
                  unitSwitchable={!range}
                />
              )}
              activeTab={innerUnit}
              onTabChange={tab => {
                setInnerUnit(tab as Unit)
              }}
              items={[
                {
                  name: 'year',
                  content: setNextName => (
                    <div className={clsx('c-date-picker--panel-wrapper')}>
                      <CDateGridPanel
                        items={Array(yearRange[1] - yearRange[0] + 1)
                          .fill(0)
                          .map((_, i) => i + yearRange[0])}
                        displayFormatter={item => item + ''}
                        isActive={isYearActive}
                        onItemClick={y => onYearSet(y, setNextName)}
                      />
                    </div>
                  ),
                },
                {
                  name: 'month',
                  content: setNextName => (
                    <div className={clsx('c-date-picker--panel-wrapper')}>
                      <CDateGridPanel
                        items={Array(12)
                          .fill(0)
                          .map((_, i) => i)}
                        displayFormatter={getDisplayMonth}
                        isActive={isMonthActive}
                        onItemClick={m => onMonthSet(m, setNextName)}
                      />
                    </div>
                  ),
                },
                {
                  name: 'day',
                  content: (
                    <div className={clsx('c-date-picker--panel-wrapper')}>
                      <CDatePanel
                        {...{
                          value,
                          dateRange: rangeValue,
                          formattedDateRange: formattedRangeValue,
                          range,
                          year,
                          month,
                          onChange: v => {
                            onChange?.(v)
                            onDateSet()
                          },
                          onDateRangeChange: onRangeChange,
                        }}
                      />
                    </div>
                  ),
                },
              ]}
            />
          }
        >
          <CInput
            value={displayValue}
            placeholder={placeholder}
            readonly
            disabled={disabled}
          />
        </CDropdown>
      </div>
    </CSizeContext.Provider>
  )
}
export default CDatePicker
export type { CDatePickerProps, Unit, DateValue, Formatter }
