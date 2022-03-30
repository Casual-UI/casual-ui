import { CSize, CSlot, CTheme } from 'casual-types'
import { CIcon, CLoading, useSize, useSizeThemeClass } from 'casual-ui-react'
import { matHighlightOff } from '@quasar/extras/material-icons'
import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'

interface CInputProps<T = string | number> {
  /**
   * 输入框内的值
   */
  value: string | number
  /**
   * 输入框值变化触发
   */
  onChange?: (v: T) => void
  /**
   * 主题
   */
  theme?: CTheme
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 输入框尺寸
   */
  size?: CSize
  /**
   * 输入框预设文本
   */
  placeholder?: string
  /**
   * 是否表现为圆角
   */
  rounded?: boolean
  /**
   * 输入框前置内容
   */
  prefix?: CSlot
  /**
   * 输入框后置内容
   */
  suffix?: CSlot
  /**
   * 是否处于加载态
   */
  loading?: boolean
  /**
   * 自定义加载内容
   */
  customLoading?: CSlot
  /**
   * 内容是否可清除
   */
  clearable?: boolean
  /**
   * 是否按照输入框表现自动失去焦点
   */
  autoBlur?: boolean
  /**
   * 失去焦点触发
   */
  setFocused?: (focused: boolean) => void
  /**
   * 是否聚焦
   */
  focused?: boolean
  /**
   * 输入框类型
   */
  type?: 'text' | 'password'
  /**
   * 是否只读
   */
  readonly?: boolean
  /**
   * 是否前置与输入框之间是否具有分割线
   */
  withPrefixDivider?: boolean
  /**
   * 是否前置与输入框之间是否具有分割线
   */
  withSuffixDivider?: boolean

  /**
   * 是否使用自定义颜色
   */
  customColor?: boolean
  /**
   * 清除图标点击触发
   */
  onClear?: () => void
}

const CInput = ({
  value,
  disabled = false,
  placeholder,
  onChange,
  theme = 'primary',
  size,
  rounded = false,
  prefix,
  suffix,
  loading = false,
  customLoading,
  clearable = false,
  autoBlur = true,
  focused = false,
  readonly = false,
  withPrefixDivider = true,
  withSuffixDivider = true,
  setFocused,
  type = 'text',
  customColor = false,
  onClear,
}: CInputProps) => {
  const [innerFocused, setInnerFocused] = useState(focused)

  useEffect(() => {
    setFocused?.(innerFocused)
  }, [innerFocused])

  useEffect(() => {
    setInnerFocused(focused)
  }, [focused])

  const canClear = useMemo(() => !!(clearable && value), [clearable, value])

  const onClearIconClick = () => {
    onChange?.('')
    onClear?.()
  }

  const onBlur = () => {
    if (autoBlur) {
      setInnerFocused(false)
    }
  }

  const contextSize = useSize(size)

  return (
    <div
      className={clsx(
        ...useSizeThemeClass({ size: contextSize, theme, prefix: 'c-input' }),
        innerFocused && `c-input--focused`,
        rounded && `c-rounded-${contextSize}`,
        loading && 'c-input--loading',
        disabled && 'c-input--disabled',
        `c-font-${contextSize}`,
        `c-px-${contextSize}`,
        `c-h-${contextSize}`,
        customColor && 'c-input--custom-color'
      )}
    >
      <div className={clsx('c-input--content-wrapper')}>
        <div
          className={clsx(
            'c-input--prefix',
            prefix && `c-pr-sm c-input--prefix-with-content`,
            withPrefixDivider && 'c-input--prefix-with-divider'
          )}
        >
          {prefix && prefix}
        </div>
        <div className="c-input--input-wrapper">
          <input
            disabled={disabled || loading}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange?.(e.target.value)}
            onFocus={() => setInnerFocused(true)}
            onBlur={onBlur}
            className={clsx(prefix && `c-pl-sm`, suffix && 'c-pr-sm')}
            type={type}
            readOnly={readonly}
          />
        </div>
        {clearable && (
          <div
            className={clsx(
              'c-input--clear-icon',
              (loading || suffix) && 'c-mr-sm',
              value && 'c-input--clear-icon-show'
            )}
            onClick={onClearIconClick}
          >
            <CIcon content={matHighlightOff} />
          </div>
        )}
        <div
          className={clsx(
            'c-input--suffix',
            withSuffixDivider && 'c-input--prefix-with-divider',
            suffix && !canClear && `c-pl-sm c-input--suffix-with-content`
          )}
        >
          <div className={clsx(loading && 'c-mr-sm')}>{suffix && suffix}</div>
          {loading && (customLoading ? customLoading : <CLoading />)}
        </div>
      </div>
    </div>
  )
}

export default CInput

export type { CInputProps }
