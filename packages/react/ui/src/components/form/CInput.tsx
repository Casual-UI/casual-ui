import { CSize, CSlot, CTheme } from 'casual-types'
import { CIcon, CLoading, useSize, useSizeThemeClass } from 'casual-ui-react'
import { matHighlightOff } from '@quasar/extras/material-icons'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useFormItemContext } from './CFormContext'

interface CInputProps<T = string | number> {
  /**
   * The input value
   * @zh 输入框内的值
   */
  value: string | number
  /**
   * Emit when the input value change.
   * @zh 输入框值变化触发
   */
  onChange?: (v: T) => void
  /**
   * The theme color of the input.
   * @zh 主题色
   */
  theme?: CTheme
  /**
   * Determine whether the input is disabled or not.
   * @zh 是否禁用
   */
  disabled?: boolean
  /**
   * The size of input.
   * @zh 输入框尺寸
   */
  size?: CSize
  /**
   * The placeholder of input.
   * @zh 输入框预设文本
   */
  placeholder?: string
  /**
   * Determine whether the input has rounded border or not.
   * @zh 是否表现为圆角
   */
  rounded?: boolean
  /**
   * Customize the prefix content of input.
   * @zh 输入框前置内容
   */
  prefix?: CSlot
  /**
   * Customize the suffix content of input.
   * @zh 输入框后置内容
   */
  suffix?: CSlot
  /**
   * Determine whether the input is in loading or not.
   * @zh 是否处于加载态
   */
  loading?: boolean
  /**
   * Customize the loading icon content.
   * @zh 自定义加载内容
   */
  customLoading?: CSlot
  /**
   * Determine whether the input is clearable or not when it value is not empty.
   * @zh 内容是否可清除
   */
  clearable?: boolean
  /**
   * Determine whether the input will auto blur like a normal input. It's useful when manual focus/blur status change is needed.
   * @zh 是否按照输入框表现自动失去焦点，通常在需要手动控制聚焦状态时需要
   */
  autoBlur?: boolean
  /**
   * Emit when the input lose focus status.
   * @zh 失去焦点触发
   */
  setFocused?: (focused: boolean) => void
  /**
   * Determine whether the input is focused or not.
   * @zh 是否聚焦
   */
  focused?: boolean
  /**
   * The type attribute of origin input.
   * @zh 输入框类型
   */
  type?: 'text' | 'password'
  /**
   * Determine whether the input is readonly or not.
   * @zh 是否只读
   */
  readonly?: boolean
  /**
   * Determine whether to show the divider between input content and prefix content or not.
   * @zh 是否前置与输入框之间是否具有分割线
   */
  withPrefixDivider?: boolean
  /**
   * Determine whether to show the divider between input content and suffix content or not.
   * @zh 是否前置与输入框之间是否具有分割线
   */
  withSuffixDivider?: boolean

  /**
   * Determine wether to use custom color or not. It's useful when you want to disable the default focus color behavior.
   * @zh 是否使用自定义颜色，通常在需要禁用自带的hover, focused样式表现时用到
   */
  customColor?: boolean
  /**
   * Emit when the clear icon is clicked.
   * @zh 清除图标点击触发
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

  const { validateCurrent, clearCurrent, hasError } = useFormItemContext()

  useEffect(() => {
    setFocused?.(innerFocused)
  }, [innerFocused])

  useEffect(() => {
    setInnerFocused(focused)
  }, [focused])

  const onClearIconClick = (e: any) => {
    e.stopPropagation()
    onChange?.('')
    onClear?.()
  }

  const onBlur = () => {
    if (autoBlur) {
      setInnerFocused(false)
    }
    validateCurrent?.(value)
  }

  const onFocus = () => {
    setInnerFocused(true)
    clearCurrent?.()
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
        customColor && 'c-input--custom-color',
        hasError && 'c-input--has-error'
      )}
    >
      <div className={clsx('c-input--content-wrapper')}>
        {prefix && (
          <div
            className={clsx(
              'c-input--prefix',
              prefix && `c-pr-sm c-input--prefix-with-content`,
              withPrefixDivider && 'c-input--prefix-with-divider'
            )}
          >
            <div>{prefix}</div>
          </div>
        )}
        <div className="c-input--input-wrapper">
          <input
            disabled={disabled || loading}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange?.(e.target.value)}
            onFocus={onFocus}
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
            withSuffixDivider && 'c-input--suffix-with-divider',
            suffix && `c-pl-sm c-input--suffix-with-content`
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
