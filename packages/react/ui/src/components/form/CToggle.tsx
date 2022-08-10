import { CSize } from 'casual-types'
import { useSize } from 'casual-ui-react'
import clsx from 'clsx'
import React from 'react'

interface CToggleProps {
  /**
   * The label text
   * @zh 文案
   */
  label?: string
  /**
   * The size
   * @zh 尺寸
   */
  size?: CSize
  /**
   * The current value.
   * @zh 当前值
   */
  value: any
  /**
   * Emit when current value change
   * @zh 值变化时触发
   */
  onChange?: (newValue: any) => void
  /**
   * The value used when the toggle is on
   * @zh 打开时的值
   */
  checkValue?: any
  /**
   * The value used when the toggle is off
   * @zh 关闭时的值
   */
  uncheckValue?: any
  /**
   * Determine wether the toggle is disabled or not.
   * @zh 是否禁用
   */
  disabled?: boolean
}

const CToggle = ({
  size,
  label = '',
  value,
  onChange,
  checkValue = true,
  uncheckValue = false,
  disabled = false,
}: CToggleProps) => {
  const realSize = useSize(size)

  const onToggle = () => {
    if (disabled) return
    onChange?.(value === checkValue ? uncheckValue : checkValue)
  }

  return (
    <div
      className={clsx(
        'c-toggle',
        `c-toggle--size-${realSize}`,
        `c-h-${realSize}`,
        `c-font-${realSize}`,
        value === checkValue && 'c-toggle--checked',
        disabled && 'c-toggle--disabled'
      )}
      onClick={onToggle}
    >
      <div className="c-toggle--track">
        <div className="c-toggle--dot"></div>
      </div>
      <div className="c-toggle--label">{label}</div>
    </div>
  )
}

export default CToggle

export type { CToggleProps }
