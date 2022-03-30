import { CSize, CTheme } from 'casual-types'
import { useSize, useTheme } from 'casual-ui-react'
import clsx from 'clsx'
import React from 'react'
type CCheckboxModel = boolean | string | number

interface CCheckboxProps {
  /**
   * 主题
   */
  theme?: CTheme
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 文字
   */
  label?: string
  /**
   * 当前值
   */
  value: CCheckboxModel
  /**
   * 当前值变化时触发
   */
  onChange?: (newValue: CCheckboxModel) => void
  /**
   * 选中时的值
   */
  checkedValue?: CCheckboxModel
  /**
   * 是否禁用
   */
  disabled?: boolean
}

const CCheckbox = ({
  value,
  checkedValue = true,
  onChange,
  theme,
  label = '',
  size,
  disabled = false,
}: CCheckboxProps) => {
  const toggleCheckStatus = () => {
    if (disabled) return
    onChange?.(value === checkedValue ? '' : checkedValue)
  }

  const realTheme = useTheme(theme)
  const realSize = useSize(size)

  return (
    <div
      className={clsx(
        'c-checkbox',
        `c-checkbox--theme-${realTheme}`,
        `c-h-${realSize}`,
        `c-font-${realSize}`,
        checkedValue === value && 'c-checkbox--checked',
        disabled && 'c-checkbox--disabled'
      )}
      onClick={toggleCheckStatus}
    >
      <svg
        className="c-checkbox--check-wrapper"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          className="c-checkbox--checker"
          fill="none"
          d="M1.73,12.91 8.1,19.28 22.79,4.59"
        ></path>
        {/* <path d="M4,14H20V10H4"></path> */}
      </svg>
      <div className="c-checkbox--label">{label}</div>
    </div>
  )
}

export default CCheckbox

export type { CCheckboxProps, CCheckboxModel }
