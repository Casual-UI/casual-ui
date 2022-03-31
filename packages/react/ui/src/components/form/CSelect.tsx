import { CSize } from 'casual-types'
import { useSize, CSizeContext, CIcon } from 'casual-ui-react'
import { matKeyboardArrowDown } from '@quasar/extras/material-icons'
import clsx from 'clsx'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import CTag from '../basic/tag/CTag'
import CDropdown from '../interact/CDropdown'
import CList from '../list/CList'
import CInput from './CInput'

/**
 * 选择器值类型
 */
type CSelectModelValue = string | number | Array<string | number>

type OOption = {
  label: string
  value: any
  [otherKey: string | number | symbol]: any
}

interface CSelectProps {
  /**
   * 预设文本
   */
  placeholder?: string
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 选择框的值
   */
  value: CSelectModelValue
  /**
   * 值变化触发
   */
  onChange: (newValue: CSelectModelValue) => void
  /**
   * 选项数组
   */
  options?: OOption[]
  /**
   * 是否内容可清除
   */
  clearable?: boolean
  /**
   * 是否可多选
   */
  multiple?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
}

const CSelect = ({
  placeholder,
  size,
  options = [],
  clearable,
  onChange,
  value,
  multiple = false,
  disabled = false,
}: CSelectProps) => {
  const selectDom = useRef<HTMLDivElement>(null)
  const tagsDom = useRef<HTMLDivElement>(null)

  const [initialSelectDomHeight, setInitialSelectDomHeight] = useState(0)
  const [selectDomHeight, setSelectDomHeight] = useState(-1)

  const selectDomStyle = useMemo(() => {
    if (selectDomHeight < 1) return {}
    return {
      height: `${selectDomHeight}px`,
    }
  }, [selectDomHeight])

  const [inputValue, setInputValue] = useState<string | number>('')
  const contextSize = useSize(size)
  const [focused, setFocused] = useState(false)

  const realPlaceholder = useMemo(() => {
    if (!multiple) return placeholder
    return (value as any[]).length > 0 ? '' : placeholder
  }, [placeholder, value])

  const selectedOptions = useMemo(() => {
    if (!multiple) return []
    return options.filter(op => (value as any[]).some(v => v === op.value))
  }, [multiple, value, options])

  useEffect(() => {
    setInitialSelectDomHeight(selectDom.current?.clientHeight || -1)
  }, [])

  useEffect(() => {
    if (multiple) {
      const newHeight = tagsDom.current?.clientHeight || -1
      if (newHeight > initialSelectDomHeight) {
        setSelectDomHeight(newHeight)
        return
      }
      setSelectDomHeight(initialSelectDomHeight)
      return
    }
    setInputValue(options.find(item => item.value === value)?.label || '')
  }, [value])

  const onItemClick = (item: OOption) => {
    if (multiple) {
      const selectedValues = value as any[]
      const idx = selectedValues.findIndex(v => v === item.value)
      if (idx === -1) {
        onChange([...selectedValues, item.value])
        return
      }
      onChange([
        ...selectedValues.slice(0, idx),
        ...selectedValues.slice(idx + 1),
      ])
      return
    }
    onChange(item.value)
    setFocused(false)
  }

  const onSelectClick = () => {
    if (disabled) return

    if (multiple) {
      setFocused(!focused)
    }
  }

  const onArrowClick = () => {
    if (disabled) return
    if (!multiple) {
      setFocused(!focused)
    }
  }

  const isItemActive = (item: OOption) => {
    if (multiple) {
      return (value as any[]).some(v => v === item.value)
    }
    return item.value === value
  }

  const onClear = () => {
    if (multiple) {
      onChange?.([])
      return
    }
    onChange?.('')
  }

  return (
    <CSizeContext.Provider value={contextSize}>
      <CDropdown
        value={focused}
        onChange={setFocused}
        disabled={disabled}
        dropContent={
          <div
            className={clsx(
              `c-py-${contextSize}`,
              focused && 'c-select--options-show'
            )}
          >
            <CList
              itemKey="value"
              items={options}
              activeFn={isItemActive}
              clickable
              onItemClick={onItemClick}
            />
          </div>
        }
      >
        <div
          ref={selectDom}
          className={clsx(
            'c-select',
            focused && 'c-select--focused',
            `c-font-${contextSize}`,
            disabled && 'c-select--disabled'
          )}
          style={selectDomStyle}
        >
          <div className="c-select--input-wrapper" onClick={onSelectClick}>
            {multiple ? (
              <div
                className={clsx(
                  'c-select--placeholder',
                  `c-h-${contextSize}`,
                  `c-px-${contextSize}`
                )}
              >
                {realPlaceholder}
              </div>
            ) : (
              <CInput
                value={inputValue}
                onChange={v => setInputValue(v)}
                focused={focused}
                setFocused={setFocused}
                placeholder={realPlaceholder}
                autoBlur={false}
                clearable={clearable}
                readonly
                withSuffixDivider={false}
                customColor
                disabled={disabled}
                onClear={onClear}
              />
            )}
            <div
              className={clsx(
                'c-select--arrow',
                `c-mr-${contextSize}`,
                focused && `c-select--arrow-show-options`
              )}
              onClick={onArrowClick}
            >
              <CIcon content={matKeyboardArrowDown} />
            </div>
            {multiple && (
              <div
                ref={tagsDom}
                className={clsx('c-select--multiple-tags', 'c-px-sm')}
              >
                {selectedOptions.map(op => (
                  <div className="" key={op.value}>
                    <CTag
                      label={op.label}
                      size="xs"
                      rounded
                      closeable
                      onClose={() => onItemClick(op)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CDropdown>
    </CSizeContext.Provider>
  )
}

export default CSelect

export type { CSelectProps }
